'use client'
import {useEffect, useState} from "react";
import CategoryDashboard from "./CategoryDashboard";
import {Category} from "./api/CategoryModel";
import {getCategories} from "./api/CategoryService";

interface Props {
    categories: Category[]
}

export default function CategoryDashboardWrapper(props: Props) {
    const [reloadKey, setReloadKey] = useState(0)
    const [categories, setCategories] = useState<Category[]>(props.categories)

    const reloadTable = () => {
        setReloadKey(reloadKey + 1);
    }

    useEffect(() => {
        async function fetchCategories() {
            setCategories(await getCategories())
        }

        if (reloadKey != 0) {
            fetchCategories()
        }
    }, [reloadKey]);

    return <CategoryDashboard categories={categories} reloadTable={reloadTable}></CategoryDashboard>
}