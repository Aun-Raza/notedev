import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import { Note } from '@/types';

interface IDeletePrompts {
  isOpen: boolean;
  onOpenChange: () => void;
  selectedNote: Note | null;
  onDelete: (id: string) => void;
}

const DeletePrompt = ({
  isOpen,
  onOpenChange,
  selectedNote,
  onDelete,
}: IDeletePrompts) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              {selectedNote?.title}
            </ModalHeader>
            <ModalBody>
              <p>Are you sure you want to delete?</p>
            </ModalBody>
            <ModalFooter>
              <Button color='primary' variant='light' onPress={onClose}>
                Close
              </Button>
              <Button
                color='danger'
                onPress={() => {
                  if (selectedNote) onDelete(selectedNote.id);
                  onClose();
                }}
              >
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DeletePrompt;
