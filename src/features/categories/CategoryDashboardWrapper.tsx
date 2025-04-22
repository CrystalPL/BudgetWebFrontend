'use client'
import {useEffect, useState} from "react";
import CategoryDashboard from "./CategoryDashboard";
import {Category} from "./api/CategoryModel";

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
            await new Promise((resolve) => setTimeout(resolve, 500)); // Opóźnienie 500 ms
            setCategories([
                {id: 1, name: "Jedzenie", color: "#FF5722"},
                {id: 2, name: "Technologia", color: "#2196F3"},
                {id: 3, name: "Sport", color: "#4CAF50"},
            ]);
        }

        if (reloadKey != 0) {
            fetchCategories()
        }
    }, [reloadKey]);

    return <CategoryDashboard categories={categories} reloadTable={reloadTable}></CategoryDashboard>
}