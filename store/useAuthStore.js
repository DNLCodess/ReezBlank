import { create } from 'zustand'
import { supabase } from '../lib/supabase'

const useAuthStore = create((set, get) => ({
  user: null,
  loading: true,
  
  // Initialize auth state
  initialize: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      set({ user: session?.user || null, loading: false })
      
      // Listen for auth changes
      supabase.auth.onAuthStateChange((event, session) => {
        set({ user: session?.user || null })
      })
    } catch (error) {
      console.error('Error initializing auth:', error)
      set({ loading: false })
    }
  },

  // Sign up
  signUp: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) throw error
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Sign in
  signIn: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      set({ user: data.user })
      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Sign out
  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      set({ user: null })
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Reset password
  resetPassword: async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email)
      if (error) throw error
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },
}))

export default useAuthStore