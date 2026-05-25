import axios from 'axios';
import { products as localProducts } from '../data/products';

const api = axios.create({
  baseURL: '/api', // Proxied in Vite to http://localhost:8000
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('trendcart_auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fallback wrappers for testing without Laravel backend
export const auth = {
  register: async (data) => {
    try { 
      const res = await api.post('/register', data);
      if (res.data?.user) localStorage.setItem('trendcart_current_user', JSON.stringify(res.data.user));
      return res;
    } catch (err) {
      if (err.response) throw err;
      const users = JSON.parse(localStorage.getItem('trendcart_users') || '[]');
      if (users.find(u => u.email === data.email)) throw { response: { data: { message: 'Email already exists.' } } };
      const user = { ...data, id: Date.now() };
      users.push(user);
      localStorage.setItem('trendcart_users', JSON.stringify(users));
      localStorage.setItem('trendcart_current_user', JSON.stringify(user));
      return { data: { user, access_token: 'mock-token' } };
    }
  },
  login: async (credentials) => {
    // Check hardcoded mock accounts first
    if (credentials.email === 'admin@trendcart.com' && credentials.password === 'trendcart123') {
      const user = { name: 'TrendCart Admin', email: 'admin@trendcart.com', phone: '0000000000', address: 'Command Center', pincode: '000000', id: 0 };
      localStorage.setItem('trendcart_current_user', JSON.stringify(user));
      return { data: { user, access_token: 'mock-admin-token' } };
    }
    if (credentials.email === 'demo@trendcart.com' && credentials.password === 'smart') {
      const user = { name: 'Demo User', email: 'demo@trendcart.com', phone: '9999999999', address: 'TrendCart HQ, Cyber City', pincode: '100001', id: 1 };
      localStorage.setItem('trendcart_current_user', JSON.stringify(user));
      return { data: { user, access_token: 'mock-token' } };
    }

    try { 
      const res = await api.post('/login', credentials); 
      if (res.data?.user) localStorage.setItem('trendcart_current_user', JSON.stringify(res.data.user));
      return res;
    } catch (err) {
      // Fallback to localStorage registered accounts
      const users = JSON.parse(localStorage.getItem('trendcart_users') || '[]');
      const user = users.find(u => u.email === credentials.email && u.password === credentials.password);
      if (user) {
        localStorage.setItem('trendcart_current_user', JSON.stringify(user));
        return { data: { user, access_token: 'mock-token' } };
      }
      
      if (err.response) throw err;
      throw { response: { data: { message: 'Invalid credentials' } } };
    }
  },
  logout: async () => {
    localStorage.removeItem('trendcart_current_user');
    try { return await api.post('/logout'); } catch (err) { return { data: { message: 'ok' } }; }
  },
};

export const products = {
  getAll: async (category = 'all') => {
    try { return await api.get(`/products${category !== 'all' ? `?category=${category}` : ''}`); } catch (err) {
      const stored = JSON.parse(localStorage.getItem('trendcart_products') || JSON.stringify(localProducts));
      const filtered = category === 'all' ? stored : stored.filter(p => p.category === category);
      return { data: filtered };
    }
  },
  getOne: async (id) => {
    try { return await api.get(`/products/${id}`); } catch (err) {
      const stored = JSON.parse(localStorage.getItem('trendcart_products') || JSON.stringify(localProducts));
      return { data: stored.find(p => p.id === id) };
    }
  },
};

export const admin = {
  createProduct: async (data) => {
    try { return await api.post('/admin/products', data); } catch (err) {
      if (err.response) throw err;
      const productsList = JSON.parse(localStorage.getItem('trendcart_products') || JSON.stringify(localProducts));
      const newProduct = { ...data, id: data.id || `TC-${Date.now()}` };
      productsList.unshift(newProduct);
      localStorage.setItem('trendcart_products', JSON.stringify(productsList));
      return { data: newProduct };
    }
  },
  updateProduct: async (id, data) => {
    try { return await api.put(`/admin/products/${id}`, data); } catch (err) {
      if (err.response) throw err;
      const productsList = JSON.parse(localStorage.getItem('trendcart_products') || JSON.stringify(localProducts));
      const index = productsList.findIndex(p => p.id === id);
      if (index > -1) {
        productsList[index] = { ...productsList[index], ...data };
        localStorage.setItem('trendcart_products', JSON.stringify(productsList));
        return { data: productsList[index] };
      }
      throw { response: { data: { message: 'Product not found' } } };
    }
  },
  deleteProduct: async (id) => {
    try { return await api.delete(`/admin/products/${id}`); } catch (err) {
      if (err.response) throw err;
      const productsList = JSON.parse(localStorage.getItem('trendcart_products') || JSON.stringify(localProducts));
      const filtered = productsList.filter(p => p.id !== id);
      localStorage.setItem('trendcart_products', JSON.stringify(filtered));
      return { data: { message: 'Deleted' } };
    }
  }
};

export const orders = {
  create: async (data) => {
    try { return await api.post('/orders', data); } catch (err) {
      // Always fallback to localStorage if backend fails
      const allOrders = JSON.parse(localStorage.getItem('trendcart_orders') || '[]');
      const newOrder = { ...data, id: `TC-${Math.floor(100000 + Math.random() * 900000)}`, status: 'confirmed', created_at: new Date().toISOString() };
      allOrders.push(newOrder);
      localStorage.setItem('trendcart_orders', JSON.stringify(allOrders));
      return { data: newOrder };
    }
  },
  getAll: async () => {
    try { return await api.get('/orders'); } catch (err) {
      return { data: JSON.parse(localStorage.getItem('trendcart_orders') || '[]') };
    }
  },
  getOne: async (id) => {
    try { return await api.get(`/orders/${id}`); } catch (err) {
      const o = JSON.parse(localStorage.getItem('trendcart_orders') || '[]').find(x => x.id === id);
      return o ? { data: o } : { data: null };
    }
  },
  track: async (id) => {
    try { return await api.get(`/orders/track/${id}`); } catch (err) {
      // Fallback to localStorage if backend fails or returns 404
      const o = JSON.parse(localStorage.getItem('trendcart_orders') || '[]').find(x => x.id === id);
      if (o) return { data: o };
      
      if (err.response) throw err;
      throw { response: { data: { message: 'Not found' } } };
    }
  },
};

export const profile = {
  get: async () => {
    try { 
      const res = await api.get('/profile'); 
      if (res.data) localStorage.setItem('trendcart_current_user', JSON.stringify(res.data));
      return res;
    } catch (err) { 
      const user = JSON.parse(localStorage.getItem('trendcart_current_user') || 'null');
      return { data: user || {} }; 
    }
  },
  update: async (data) => {
    try { 
      const res = await api.put('/profile', data); 
      if (res.data) localStorage.setItem('trendcart_current_user', JSON.stringify(res.data));
      return res;
    } catch (err) {
      if (err.response) throw err;
      localStorage.setItem('trendcart_current_user', JSON.stringify(data));
      return { data: data };
    }
  },
};

export default api;
