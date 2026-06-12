import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Donor from '@/lib/models/Donor';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const bloodGroup = searchParams.get('bloodGroup') || '';
    const eligible = searchParams.get('eligible');
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '12')));

    const query = {};

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    if (bloodGroup) {
      query.bloodGroup = bloodGroup;
    }

    let donors = await Donor.find(query)
      .sort({ createdAt: -1 })
      .lean({ virtuals: true });

    if (eligible === 'true') {
      const now = new Date();
      donors = donors.filter((d) => {
        if (!d.lastDonationDate) return false;
        const nextDate = new Date(d.lastDonationDate);
        nextDate.setDate(nextDate.getDate() + 120);
        return nextDate <= now;
      });
    } else if (eligible === 'false') {
      const now = new Date();
      donors = donors.filter((d) => {
        if (!d.lastDonationDate) return true;
        const nextDate = new Date(d.lastDonationDate);
        nextDate.setDate(nextDate.getDate() + 120);
        return nextDate > now;
      });
    }

    const total = donors.length;
    const totalPages = Math.ceil(total / limit);
    const paginatedDonors = donors.slice((page - 1) * limit, page * limit);

    return NextResponse.json({
      donors: paginatedDonors,
      pagination: { page, limit, total, totalPages },
    });
  } catch (error) {
    console.error('GET /api/donors error:', error);
    return NextResponse.json({ error: 'Failed to fetch donors' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    if (!body.name || !body.bloodGroup || !body.phone || !body.address || !body.lastDonationDate) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const validGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    if (!validGroups.includes(body.bloodGroup)) {
      return NextResponse.json({ error: 'Invalid blood group' }, { status: 400 });
    }

    const donor = await Donor.create({
      name: body.name.trim(),
      bloodGroup: body.bloodGroup,
      phone: body.phone.trim(),
      address: body.address.trim(),
      lastDonationDate: new Date(body.lastDonationDate),
    });

    return NextResponse.json({ donor }, { status: 201 });
  } catch (error) {
    console.error('POST /api/donors error:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return NextResponse.json({ error: messages.join(', ') }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create donor' }, { status: 500 });
  }
}
