import Panel from './components/UI/Panel/Panel';

const DUMMY_DATA = [
    {
        image: "image-omelette.jpeg",
        title: "Simple Omelette Recipe",
        description: "Add later",
        preparation: {
            title: "Prepataion time",
            items: [
                {
                    key: "Total",
                    value: "Approximatlely 10 minutes"
                },
                {
                    key: "Prepataion",
                    value: "5 minutes"
                },
                {
                    key: "Cooking",
                    value: "5 minutes"
                },
            ]
        },
        ingredients: ["2-3 large eggs", "Salt, to tase", "Pepper, to taste", "1 tablespoon of butter or oil", "Optional fillings: cheese, diced vegatables, cooked meats, herbs"],
        instructions: [
            {
                key: "Beat the eggs",
                value: "Add later"
            },
            {
                key: "Heat the pan",
                value: "Add later"
            },
            {
                key: "Cook the omlete",
                value: "Add later"
            },
            {
                key: "Add fillings (optional)",
                value: "Add later"
            },
            {
                key: "Fold and serve",
                value: "Add later"
            },
            {
                key: "Enjoy",
                value: "Add later"
            }
        ],
        nutrition: {
            title: "The table below shows nutritional values per serving without the additional fillings.",
            items: [
                {
                    key: "Calories",
                    value: "277kcal"
                },
                {
                    key: "Carbs",
                    value: "0g"
                },
                {
                    key: "Protein",
                    value: "20g"
                },
                {
                    key: "Fat",
                    value: "22g"
                },
            ]
        }
    }
]

export default function App() {
    return (
        <main>
            <Panel data={DUMMY_DATA[0]} />
        </main>
    )
}