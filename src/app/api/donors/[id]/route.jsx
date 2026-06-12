import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Donor from '@/lib/models/Donor';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const donor = await Donor.findById(id).lean({ virtuals: true });

    if (!donor) {
      return NextResponse.json({ error: 'Donor not found' }, { status: 404 });
    }

    return NextResponse.json({ donor });
  } catch (error) {
    console.error('GET /api/donors/[id] error:', error);
    return NextResponse.json({ error: 'Failed to fetch donor' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const validGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    if (body.bloodGroup && !validGroups.includes(body.bloodGroup)) {
      return NextResponse.json({ error: 'Invalid blood group' }, { status: 400 });
    }

    const updateData = {};
    if (body.name) updateData.name = body.name.trim();
    if (body.bloodGroup) updateData.bloodGroup = body.bloodGroup;
    if (body.phone) updateData.phone = body.phone.trim();
    if (body.address) updateData.address = body.address.trim();
    if (body.lastDonationDate) updateData.lastDonationDate = new Date(body.lastDonationDate);

    const donor = await Donor.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).lean({ virtuals: true });

    if (!donor) {
      return NextResponse.json({ error: 'Donor not found' }, { status: 404 });
    }

    return NextResponse.json({ donor });
  } catch (error) {
    console.error('PUT /api/donors/[id] error:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return NextResponse.json({ error: messages.join(', ') }, { status: 400 });
    }
    if (error.name === 'CastError') {
      return NextResponse.json({ error: 'Invalid donor ID' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update donor' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const donor = await Donor.findByIdAndDelete(id);

    if (!donor) {
      return NextResponse.json({ error: 'Donor not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Donor deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/donors/[id] error:', error);
    if (error.name === 'CastError') {
      return NextResponse.json({ error: 'Invalid donor ID' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to delete donor' }, { status: 500 });
  }
}
