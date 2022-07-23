import useFetchUserPantries from "./useFetchUserPantries";

function useComparePantryToRecipe(recipeObject){
    const [userPantries] = useFetchUserPantries()
    
    if (recipeObject){
 
    const activePantries = userPantries.filter(pantryObject => pantryObject.user_pantries[0].active)
    console.log("ActivePantries", activePantries)

    function retrieveMissingIngredients(){
        //If there are one or  multiple active pantries
        if (activePantries.length >= 1){
            const missingIngredientsArray = activePantries.map(pantryObject => {
                //Compare the pantry object ingredients to recipe ingredients
                const pantryIngredients = pantryObject.ingredients
                console.log('Pantry Ingredients', pantryIngredients)
                let missingRecipeIngredients = []
                let hashMap = {}
                //Create a hasMap for every pantry ingredient
                for (let i = 0; i < pantryIngredients.length; i++){
                    
                    if(pantryIngredients[i].ingredient_name){
                         // if the hash key already exists
                        if(hashMap[pantryIngredients[i].ingredient_name.toLowerCase()]){
                            hashMap[pantryIngredients[i].ingredient_name.toLowerCase()] = hashMap[pantryIngredients[i].ingredient_name.toLowerCase()] += 1
                        }else{
                            hashMap[pantryIngredients[i].ingredient_name.toLowerCase()] = 1
                        }

                    }
                   
                }

                //Use the hashMap. If a recipe ingredient does NOT exist as a key in the hashmap, push to missingIngredients. 
                for (let j = 0; j < recipeObject.ingredients.length; j++){
                const recipeIngredients = recipeObject.ingredients
                console.log('RecipeIngredients',recipeIngredients);
                    
                    if(recipeIngredients[j].ingredient_name){
                        if (!hashMap[recipeIngredients[j].ingredient_name.toLowerCase()]){
                            missingRecipeIngredients.push(recipeIngredients[j].ingredient_name)
                        }
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