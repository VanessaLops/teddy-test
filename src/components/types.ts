import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { MutableRefObject } from "react";


export interface User {
    id: string;
    name: string;
    salary: number;
    companyValuation: string;
}

export interface UsersResponse {
    currentPage: number;
    totalPages: number;
    clients: User[];
}

export interface CardProps {
    clientesPorPagina: string;
    setClientesPorPagina: React.Dispatch<React.SetStateAction<string>>;
    options: string[];
    handleSelectOption: (value: string) => void;
    clientsToDisplay: User[];
    onAddClient: (client: User) => void;
}


export interface HeaderProps {
    handleSelectOption: (value: string) => void; 
  }
  

export interface ModalClientProps {
    visible: boolean;
    bottomSheetModalRef: MutableRefObject<BottomSheetModal>;
    handlePresentModalPress: () => void;
    onClose: () => void;
    isEditMode: boolean;  
    clientData: {
        id: string;
        name: string;
        salary: number;
        companyValuation: string;
    } | null;
}


export interface ModalPickerProps {
    visible: boolean;
    type: 'create' | 'delete' | 'update' | 'picker';
    options?: string[];
    onConfirm?: () => void;
    onCancel?: () => void;
    onSelectOption?: (value: string) => void;
    onClose: () => void;
  }
  
  
export interface SlideUpSidebarModalProps {
    visible: boolean;
    onSelectOption: (value: string) => void;  
    onClose: () => void; 
}
  