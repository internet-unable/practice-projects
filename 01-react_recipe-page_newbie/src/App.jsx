// import Counter from './components/Counter';
import Panel from './components/UI/Panel/Panel';

const DUMMY_DATA = [
    {
        image: "image-omelette.jpeg",
        title: "Simple Omelette Recipe",
        description: "An easy and quick dish, perfect for any meal. This classic omelette combines beaten eggs cooked to perfection, optionally filled with your choice of cheese, vegetables, or meats. ",
        preparation: {
            title: "Preparation time",
            items: [
                {
                    key: "Total",
                    value: "Approximately 10 minutes"
                },
                {
                    key: "Preparation",
                    value: "5 minutes"
                },
                {
                    key: "Cooking",
                    value: "5 minutes"
                },
            ]
        },
        ingredients: {
            title: "Ingredients",
            items: ["2-3 large eggs", "Salt, to taste", "Pepper, to taste", "1 tablespoon of butter or oil", "Optional fillings: cheese, diced vegatables, cooked meats, herbs"]
        },
        instructions: {
            title: "Instructions",
            items: [
                {
                    key: "Beat the eggs",
                    value: "In a bowl, beat the eggs with a pinch of salt and pepper until they are well mixed. You can add a tablespoon of water or milk for a fluffier texture."
                },
                {
                    key: "Heat the pan",
                    value: "Place a non-stick frying pan over medium heat and add butter or oil."
                },
                {
                    key: "Cook the omelette",
                    value: "Once the butter is melted and bubbling, pour in the eggs. Tilt the pan to ensure the eggs evenly coat the surface."
                },
                {
                    key: "Add fillings (optional)",
                    value: "When the eggs begin to set at the edges but are still slightly runny in the middle, sprinkle your chosen fillings over one half of the omelette."
                },
                {
                    key: "Fold and serve",
                    value: "As the omelette continues to cook, carefully lift one edge and fold it over the fillings. Let it cook for another minute, then slide it onto a plate."
                },
                {
                    key: "Enjoy",
                    value: "Serve hot, with additional salt and pepper if needed."
                }
            ]
        },
        nutrition: {
            title: "Nutrition",
            description: "The table below shows nutritional values per serving without the additional fillings.",
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
            {/* <Counter /> */}
            <Panel data={DUMMY_DATA[0]} />
        </main>
    )
}