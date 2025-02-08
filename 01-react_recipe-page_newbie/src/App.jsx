import Recipe from "./components/Pages/Recipe/Recipe";

const DUMMY_DATA = [
    {
        image: "image-omelette.jpeg",
        title: "Simple Omelette Recipe",
        description: "An easy and quick dish, perfect for any meal. This classic omelette combines beaten eggs cooked to perfection, optionally filled with your choice of cheese, vegetables, or meats. ",
        preparation: {
            title: "Preparation time",
            items: [
                {
                    id: "pre-1",
                    desc: "Total",
                    value: "Approximately 10 minutes"
                },
                {
                    id: "pre-2",
                    desc: "Preparation",
                    value: "5 minutes"
                },
                {
                    id: "pre-3",
                    desc: "Cooking",
                    value: "5 minutes"
                },
            ]
        },
        ingredients: {
            title: "Ingredients",
            items: [
                {
                    id: "ing-1",
                    value: "2-3 large eggs"
                },
                {
                    id: "ing-2",
                    value: "Salt, to taste"
                },
                {
                    id: "ing-3",
                    value: "Pepper, to taste"
                },
                {
                    id: "ing-4",
                    value: "1 tablespoon of butter or oil"
                },
                {
                    id: "ing-5",
                    value: "Optional fillings: cheese, diced vegatables, cooked meats, herbs"
                }
            ]
        },
        instructions: {
            title: "Instructions",
            items: [
                {
                    id: "ins-1",
                    desc: "Beat the eggs",
                    value: "In a bowl, beat the eggs with a pinch of salt and pepper until they are well mixed. You can add a tablespoon of water or milk for a fluffier texture."
                },
                {
                    id: "ins-2",
                    desc: "Heat the pan",
                    value: "Place a non-stick frying pan over medium heat and add butter or oil."
                },
                {
                    id: "ins-3",
                    desc: "Cook the omelette",
                    value: "Once the butter is melted and bubbling, pour in the eggs. Tilt the pan to ensure the eggs evenly coat the surface."
                },
                {
                    id: "ins-4",
                    desc: "Add fillings (optional)",
                    value: "When the eggs begin to set at the edges but are still slightly runny in the middle, sprinkle your chosen fillings over one half of the omelette."
                },
                {
                    id: "ins-5",
                    desc: "Fold and serve",
                    value: "As the omelette continues to cook, carefully lift one edge and fold it over the fillings. Let it cook for another minute, then slide it onto a plate."
                },
                {
                    id: "ins-6",
                    desc: "Enjoy",
                    value: "Serve hot, with additional salt and pepper if needed."
                }
            ]
        },
        nutrition: {
            title: "Nutrition",
            description: "The table below shows nutritional values per serving without the additional fillings.",
            items: [
                {
                    id: "nut-1",
                    desc: "Calories",
                    value: "277kcal"
                },
                {
                    id: "nut-2",
                    desc: "Carbs",
                    value: "0g"
                },
                {   
                    id: "nut-3",
                    desc: "Protein",
                    value: "20g"
                },
                {
                    id: "nut-4",
                    desc: "Fat",
                    value: "22g"
                },
            ]
        }
    }
]

export default function App() {
    return (
        <main>
            <Recipe data={DUMMY_DATA[0]} />
        </main>
    )
}