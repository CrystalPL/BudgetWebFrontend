import CategoryDashboardWrapper from "../../../../features/categories/CategoryDashboardWrapper";

export default function Page() {
    const categories = [
        {id: 1, name: "Jedzenie", color: "#FF5722"},
        {id: 2, name: "Technologia", color: "#2196F3"},
        {id: 3, name: "Sport", color: "#4CAF50"},
    ]

    return <CategoryDashboardWrapper categories={categories}></CategoryDashboardWrapper>
}