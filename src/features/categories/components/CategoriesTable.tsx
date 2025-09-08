import {
    Chip,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography
} from "@mui/material";
import TableColumn from "../../household/components/base/TableColumn";
import EditIcon from "@mui/icons-material/Edit";
import * as React from "react";
import {useState} from "react";
import {sort} from "../../../util/SortUtil";
import {DialogShowingController, GetShowingController} from "../../../controllers/DialogShowingController";
import EditCategoryDialog from "./EditCategoryDialog";
import {HouseholdReloadKeyProps} from "../../household/api/HouseholdModel";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmationDialog from "../../household/components/base/ConfirmationDialog";
import {Category} from "../api/CategoryModel";
import {deleteCategory} from "../api/CategoryService";

interface CategoriesTableProps extends HouseholdReloadKeyProps {
    categories: Category[]
}

export default function CategoriesTable(props: CategoriesTableProps) {
    const [orderCategoryName, setOrderCategoryName] = useState<'asc' | 'desc'>('asc');
    const sortedCategories: Category[] = sort(orderCategoryName, props.categories, value => value.name)
    const [editedCategory, setEditedCategory] = useState<Category | null>(null)
    const editCategoryDialogController: DialogShowingController = GetShowingController()
    const deleteCategoryDialogController: DialogShowingController = GetShowingController()

    const handleAction = (category: Category, dialogController: DialogShowingController) => {
        setEditedCategory(category)
        dialogController.openDialog()
    }

    return (
        <TableContainer
            component={Paper}
            sx={{
                borderRadius: 3,
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                mb: 4,
            }}
        >
            <Table>
                <TableHead sx={{backgroundColor: '#f5f5f5'}}>
                    <TableRow>
                        <TableColumn columnName="Nazwa kategorii" orderType={orderCategoryName}
                                     setOrderType={setOrderCategoryName}
                                     setOrderBy={() => {
                                     }}></TableColumn>
                        <TableCell sx={{fontWeight: 'bold', borderBottom: '1px solid #ddd'}}>Kolor</TableCell>
                        <TableCell align="right"
                                   sx={{fontWeight: 'bold', borderBottom: '1px solid #ddd'}}>Akcje</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedCategories
                        .map((category) => (
                            <TableRow key={category.id} sx={{
                                '&:hover': {
                                    backgroundColor: '#f5f5f5'
                                }
                            }}>
                                <TableCell>{category.name}</TableCell>
                                <TableCell><Chip
                                    sx={{backgroundColor: category.color, width: '100px'}}></Chip></TableCell>
                                <TableCell align="right">
                                    <Tooltip title="Edytuj kategorie">
                                        <IconButton
                                            color="primary"
                                            onClick={() => handleAction(category, editCategoryDialogController)}
                                            sx={{
                                                "&:hover": {
                                                    backgroundColor: "rgba(75,187,71,0.2)",
                                                },
                                            }}
                                        >
                                            <EditIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Usuń kategorie">
                                        <IconButton
                                            color="error"
                                            onClick={() => handleAction(category, deleteCategoryDialogController)}
                                            sx={{
                                                "&:hover": {
                                                    backgroundColor: "rgba(206,21,21,0.2)",
                                                },
                                            }}
                                        >
                                            <DeleteIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            <EditCategoryDialog editedCategory={editedCategory}
                                reloadTable={props.reloadTable} {...editCategoryDialogController}></EditCategoryDialog>
            <ConfirmationDialog
                open={deleteCategoryDialogController.openDialogStatus}
                closeDialog={deleteCategoryDialogController.closeDialog}
                title="Potwierdzenie usunięcia"
                content={
                    <>
                        <Typography variant="body1">
                            Usunięcie kategorii spowoduje usunięcie kategorii ze wszystkich produktów.
                        </Typography>
                        <Typography variant="body1">
                            Czy na pewno chcesz usunąć kategorię <strong>{editedCategory?.name}</strong>?
                        </Typography>
                        <Typography variant="body1" color="error" fontWeight="bold">
                            TEJ OPERACJI NIE DA SIĘ COFNĄĆ
                        </Typography>
                    </>
                }
                confirmText="Usuń"
                confirmColor="error"
                action={() => deleteCategory(editedCategory?.id)} //TODO
                reloadTable={props.reloadTable}
            />
        </TableContainer>
    )
}