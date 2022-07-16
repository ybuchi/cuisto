import useFetchUserRecipes from "./useFetchUserRecipes";

function useRecommendRecipeInPantry(pantryObject){
     //Fetch all of the user's recipes in the user's library
    const [userLibrary] = useFetchUserRecipes()
    console.log("USER LIBRARY: ", userLibrary)

    //If a props.pantryObjet exists and was passed
    if (pantryObject && pantryObject.ingredients){

        //Ingredients located in the pantry
       const pantryIngredients = pantryObject.ingredients

       function retrieveIncludedIngredients(){

        //Map through the user's recipe library
        const mappedRecipeIngredientsArray = userLibrary.map(recipeObject => {
            const recipeIngredients = recipeObject.ingredients
            let ingredientsIncludedInPantry = []
            let ingredientsNotIncludedInPantry = []
            let hashMap = {}
       
            //Create a dictionary of recipe ingredients for each recipe
            for (let i = 0; i < recipeIngredients.length; i++){

                if(recipeIngredients[i].ingredient_name){

                    if(hashMap[recipeIngredients[i].ingredient_name.toLowerCase()]){
                        hashMap[recipeIngredients[i].ingredient_name.toLowerCase()] = hashMap[recipeIngredients[i].ingredient_name.toLowerCase()] += 1
                    }else{
                    hashMap[recipeIngredients[i].ingredient_name.toLowerCase()] = 1
                    }
                }
                
            }
            
            //Cross-check the dictionary of recipe ingredients with the ingredients in the pantry
            for (let j = 0; j < pantryIngredients.length; j++){

                if(pantryIngredients[j].ingredient_name){
                    
                    if(hashMap[pantryIngredients[j].ingredient_name.toLowerCase()]){
                        ingredientsIncludedInPantry.push(pantryIngredients[j].ingredient_name)
                    }else{
                        ingredientsNotIncludedInPantry.push(pantryIngredients[j].ingredient_name)
                    }
                }
                
            }

            

            //Return essential recipe metadata as well as the missing pantry ingredients
            return {
                recipe_id: recipeObject.id,
                recipe_name: recipeObject.recipe_name,
                lactose_free: recipeObject.lactose_free,
                gluten_Free: recipeObject.gluten_Free,
                peanut_free: recipeObject.peanut_free,
                cuisine: recipeObject.cuisine,
                diet: recipeObject.diet,
                ingredients: recipeObject.ingredients,
                included_pantry_ingredients: ingredientsIncludedInPantry,
                missing_ingredients: ingredientsNotIncludedInPantry,
                number_of_missing_ingredients: (recipeObject.ingredients.length - ingredientsIncludedInPantry.length),
                image: recipeObject.image
            }
 
        })
        return mappedRecipeIngredientsArray;

       }

       const includedIngredientsArray = retrieveIncludedIngredients()

       //Make pantry ingr to recipe ingr calculation in percent. Return recipes with more than 0% match.
       const recipesWithIngredientMatches = includedIngredientsArray.filter(ingredientObject => {
           const numberOfIncludedPantryIng = ingredientObject.included_pantry_ingredients.length
           const numberOfIngInRecipe = ingredientObject.ingredients.length

           if ((numberOfIncludedPantryIng/numberOfIngInRecipe)*100 > 0){
               return true;
           }else{
               return false;
           }
       })

       function partition(recipesWithIngredientMatches, left, right){
            //Use the middle of the array to create a pivot
            let pivot = recipesWithIngredientMatches[Math.floor((right + left)/2)]
            let i = left
            let j = right

            //We're setting the left pointer
            //While the left pointer is smaller than the pivot, keep moving the left pointer until it hits a value that is larger than the pivot 
            while (i <= j){
                while (recipesWithIngredientMatches[i].number_of_missing_ingredients < pivot){
                    i++;
                }
                //While the right pointer is larger than the pivot, keep moveing the right pointer until it hits a value that is smaller thatn the pivot
                while (recipesWithIngredientMatches[j].number_of_missing_ingredients > pivot){
                    i--;
                }

                //Retrieve the values of i and j when they are smaller/larger than the pivot, and swap them
                if ( i <= j){
                    [recipesWithIngredientMatches[i],recipesWithIngredientMatches[j]] = [recipesWithIngredientMatches[j],recipesWithIngredientMatches[i]];
                    i++;
                    j--;
                }
            }
            //Return the left pointer to be used in quickSort
            return i
       }

       function quickSort(recipesWithIngredientMatches, left, right){
           let index

           if (recipesWithIngredientMatches.length > 1 ){
               index = partition(recipesWithIngredientMatches, left, right);
            
               if (left < index - 1){
                   quickSort(recipesWithIngredientMatches, left, index -1)
               }

               if (index < right){
                   quickSort(recipesWithIngredientMatches, index, right)
               }
           }

           return recipesWithIngredientMatches
       }
       
       const recommendedRecipesSortedArray = quickSort(recipesWithIngredientMatches, 0, recipesWithIngredientMatches.length -1)


       return recommendedRecipesSortedArray
}}

export default useRecommendRecipeInPantry;