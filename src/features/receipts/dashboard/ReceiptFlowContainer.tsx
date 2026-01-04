import {Props} from "next/dist/client/script";
import {useFirstStepFormState} from "../forms/firstStep/FirstStepFormState";
import AILoader from "../ai/AILoader";
import {CreateReceiptDetails, Receipt} from "../api/ReceiptModel";
import {DialogShowingController, GetShowingController} from "../../../controllers/DialogShowingController";
import {StateProp} from "../../../filter/StateProp";
import FirstStepDialog from "../forms/firstStep/FirstStepDialog";
import ReceiptProductsManager from "../forms/secondStep/ReceiptProductsManager";
import {HouseholdReloadKeyProps} from "../../household/api/HouseholdModel";

interface ReceiptFlowContainerProps extends HouseholdReloadKeyProps {
    createReceiptDialogController: DialogShowingController
    editedReceiptStateProp: StateProp<Receipt | null>
    createReceiptDetailsStateProp: StateProp<CreateReceiptDetails | null>
}

export default function ReceiptFlowContainer(props: ReceiptFlowContainerProps) {
    const firstStepFormState = useFirstStepFormState();
    const aiLoader = AILoader();
    const addItemsToReceipt: DialogShowingController = GetShowingController()

    return (
        <>
            <FirstStepDialog
                creatingController={props.createReceiptDialogController}
                addItemsToReceiptController={addItemsToReceipt}
                editedReceipt={props.editedReceiptStateProp.value}
                setEditedReceipt={props.editedReceiptStateProp.setValue}
                createReceiptDetails={props.createReceiptDetailsStateProp.value}
                setCreateReceiptDetails={props.createReceiptDetailsStateProp.setValue}
                firstStepFormState={firstStepFormState}
                aiLoader={aiLoader}
            />

            <ReceiptProductsManager
                reloadTable={props.reloadTable}
                addItemController={addItemsToReceipt}
                receiptCreatingController={props.createReceiptDialogController}
                userWhoPaid={props.createReceiptDetailsStateProp.value?.whoPaidLists || []}
                editedReceipt={props.editedReceiptStateProp.value}
                firstStepFormState={firstStepFormState}
                aiLoader={aiLoader}
            />
        </>
    );
}