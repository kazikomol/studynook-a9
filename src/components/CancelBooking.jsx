"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertDialog, Button } from "@heroui/react";

const CancelEnrollButton = ({ id, token }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCancel = async (close) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/enrollment/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        close();
        router.refresh();
      } else {
        console.error("Failed to cancel Booking:", res.statusText);
      }
    } catch (error) {
      console.error("Failed to cancel booking:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog>
      <Button className="border border-red-400" color="danger" variant="light" size="sm">
        Cancel
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-100 bg-white">
            {({ close }) => (
              <>
                <AlertDialog.CloseTrigger />
                <AlertDialog.Header>
                  <AlertDialog.Icon status="danger" />
                  <AlertDialog.Heading>Confirm Cancellation</AlertDialog.Heading>
                </AlertDialog.Header>
                <AlertDialog.Body>
                  <p className="text-slate-600">
                    Are you sure you want to cancel this    Booking? This action cannot be undone and you will lose access to the course materials.
                  </p>
                </AlertDialog.Body>
                <AlertDialog.Footer>
                  <Button
                  className='text-white'
                    slot="close"
                    variant="tertiary"
                    isDisabled={isLoading}
                  >
                    Keep Booking
                  </Button>
                  <Button
                    color="danger"
                    className="font-bold"
                    isLoading={isLoading}
                    onPress={() => handleCancel(close)}
                  >
                    Yes, Cancel
                  </Button>
                </AlertDialog.Footer>
              </>
            )}
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default CancelEnrollButton;