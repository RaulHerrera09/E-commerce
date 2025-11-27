import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart: (state, action) => {
            // Reemplaza todo el carrito 
            return action.payload;
        },
        addToCartLocal: (state, action) => {
            // Añade un producto al array
            state.push(action.payload);
        },

        removeFromCart: (state, action) => {
            // Busca el índice del producto por su ID y lo elimina del array
            const index = state.findIndex(product => product.id === action.payload);
            if (index !== -1) {
                state.splice(index, 1);
            }
        }
    }
});

// Agregamos 'removeFromCart' a la lista de exportaciones
export const { setCart, addToCartLocal, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;

// --- THUNKS ---

export const thunkCartGet = () => (dispatch) => {
    console.log("Obteniendo carrito...");
}

export const thunkCartPost = (product) => (dispatch) => {
    dispatch(addToCartLocal(product));
    console.log("Producto agregado:", product.nombre);
}