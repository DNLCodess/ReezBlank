import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      total: 0,

      // Add item to cart
      addItem: (product, size = 'M', quantity = 1) => {
        const { items } = get()
        const existingItem = items.find(
          item => item.id === product.id && item.size === size
        )

        if (existingItem) {
          set({
            items: items.map(item =>
              item.id === product.id && item.size === size
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          })
        } else {
          set({
            items: [...items, { ...product, size, quantity }]
          })
        }
        get().calculateTotal()
      },

      // Remove item from cart
      removeItem: (id, size) => {
        const { items } = get()
        set({
          items: items.filter(item => !(item.id === id && item.size === size))
        })
        get().calculateTotal()
      },

      // Update item quantity
      updateQuantity: (id, size, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id, size)
          return
        }

        const { items } = get()
        set({
          items: items.map(item =>
            item.id === id && item.size === size
              ? { ...item, quantity }
              : item
          )
        })
        get().calculateTotal()
      },

      // Calculate total
      calculateTotal: () => {
        const { items } = get()
        const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        set({ total })
      },

      // Clear cart
      clearCart: () => {
        set({ items: [], total: 0 })
      },

      // Get cart item count
      getItemCount: () => {
        const { items } = get()
        return items.reduce((count, item) => count + item.quantity, 0)
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)

export default useCartStore