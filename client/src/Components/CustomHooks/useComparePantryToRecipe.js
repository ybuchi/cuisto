import useFetchUserPantries from "./useFetchUserPantries";

function useComparePantryToRecipe(recipeObject){
    const [userPantries] = useFetchUserPantries()
    if (recipeObject){

    console.log("Recipe Object to Compare: ", recipeObject)
    console.log("Pantries to Comppare: ", userPantries)
 
    const activePantries = userPantries.filter(pantryObject => pantryObject.user_pantries[0].active)

    // For use in the Cooking Session, a user should only have ONE active pantry
        //When a user clicks "Finished Cooking"
            //Check whether multiple pantries are active
                //If so, prompt user to choose a pantry
                    //Make fetch calls to make only that user pantry active
                        //Compare ingredients from the active pantry with ingredients from the recipe (below)

    //For use in the Recipe cards and other similar cards comparing Recipes to Pantries
        //If there are multiple active pantries, combine the ingredients to show missing ingredients


    //For each ingredient in a recipe
        //If that ingredient IS in a pantry
            //Compare the metrics
                //If the metrics are the same, calculate the difference
                    //If the difference < 0, put the ingredient in an array of ingredients to manually handle
                    //If the difference > or equal to 0, make fetch requests to remove items from pantry
                //If the metrics are different, put the ingredients in an array of ingredients to manually handle
        //If the ingredinet IS NOT in a pantry
            //add it to a missing ingredients array

    function retrieveMissingIngredients(){
        //If there are one or  multiple active pantries
        if (activePantries.length >= 1){
            const missingIngredientsArray = activePantries.map(pantryObject => {
                //Compare the pantry object ingredients to recipe ingredients
                const pantryIngredients = pantryObject.ingredients
                let missingRecipeIngredients = []
                let hashMap = {}
                //Create a hasMap for every pantry ingredient
                for (let i = 0; i < pantryIngredients.length; i++){
                    // if the hash key already exists
                    if(hashMap[pantryIngredients[i].ingredient_name.toLowerCase()]){
                        hashMap[pantryIngredients[i].ingredient_name.toLowerCase()] = hashMap[pantryIngredients[i].ingredient_name.toLowerCase()] += 1
                    }else{
                        hashMap[pantryIngredients[i].ingredient_name.toLowerCase()] = 1
                    }
                    console.log("HASH MAP", hashMap);
                }

                //Use the hashMap. If a recipe ingredient does NOT exist as a key in the hashmap, push to missingIngredients. 
                for (let j = 0; j < recipeObject.ingredients.length; j++){
                    
                    const recipeIngredients = recipeObject.ingredients
                    if (!hashMap[recipeIngredients[j].ingredient_name.toLowerCase()]){
                        missingRecipeIngredients.push(recipeIngredients[j].ingredient_name)
                    }
                }
                return {
                    pantry_id: pantryObject.id,
                    pantry_name: pantryObject.pantry_name,
                    missing_ingredients: missingRecipeIngredients
                }
            })

            return missingIngredientsArray
        }
    }
    const missingIngredientsArray = retrieveMissingIngredients()
    return missingIngredientsArray
}}

export default useComparePantryToRecipe;