import Container from "@mui/material/Container";
import CategoryDashboardHeader from "./components/CategoryDashboardHeader";
import {DialogShowingController, GetShowingController} from "../../controllers/DialogShowingController";
import CategoriesTable from "./components/CategoriesTable";
import {HouseholdReloadKeyProps} from "../household/api/HouseholdModel";
import * as React from "react";
import CreateCategoryDialog from "./components/CreateCategoryDialog";
import {Category} from "./api/CategoryModel";

interface CategoryDashboardData extends HouseholdReloadKeyProps {
    categories: Category[],
}

export default function CategoryDashboard(props: CategoryDashboardData) {
    const createCategoryDialogController: DialogShowingController = GetShowingController()

    return (
        <Container sx={{
            pt: 4,
            maxWidth: {
                xs: '100%',
                md: '90%',
                lg: '80%',
                xl: '88%',
            },
        }}>
            <CategoryDashboardHeader
                openCreateCategoryDialog={createCategoryDialogController.openDialog}></CategoryDashboardHeader>
            <CategoriesTable reloadTable={props.reloadTable} categories={props.categories}></CategoriesTable>
            <CreateCategoryDialog
                reloadTable={props.reloadTable} {...createCategoryDialogController}></CreateCategoryDialog>
        </Container>
    )
}