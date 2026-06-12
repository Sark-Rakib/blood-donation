"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { useToast } from "@/context/ToastContext";

export default function DeleteDonorButton({ donorId, donorName }) {
  const router = useRouter();
  const { addToast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    try {
      const res = await fetch(`/api/donors/${donorId}`, { method: "DELETE" });
      if (!res.ok) {
        addToast("Failed to delete donor", "error");
        return;
      }
      addToast("Donor deleted successfully", "success");
      router.push("/donors");
    } catch {
      addToast("Something went wrong", "error");
    } finally {
      setDeleting(false);
      setShowModal(false);
    }
  }

  return (
    <>
      <Button variant="danger" onClick={() => setShowModal(true)}>
        Delete Donor
      </Button>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Delete Donor"
      >
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Are you sure you want to delete <strong>{donorName}</strong>&apos;s
          record? This action cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={deleting}>
            {deleting ? "Deleting..." : "Yes, Delete"}
          </Button>
        </div>
      </Modal>
    </>
  );
}
