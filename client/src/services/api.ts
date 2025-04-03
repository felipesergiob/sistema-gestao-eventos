import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Erro do servidor
            console.error('Erro na API:', error.response.data);
            return Promise.reject(error.response.data);
        }
        if (error.request) {
            // Erro de rede
            console.error('Erro de rede:', error.request);
            return Promise.reject({ error: 'Erro de conexão com o servidor' });
        }
        // Erro na configuração da requisição
        console.error('Erro na requisição:', error.message);
        return Promise.reject({ error: 'Erro na requisição' });
    }
);

export const get = async <T>(url: string): Promise<T> => {
    const response = await api.get(url);
    return response.data;
};

export const post = async <T>(url: string, data: unknown): Promise<T> => {
    const response = await api.post(url, data);
    return response.data;
};

export const put = async <T>(url: string, data: unknown): Promise<T> => {
    const response = await api.put(url, data);
    return response.data;
};

export const del = async <T>(url: string): Promise<T> => {
    const response = await api.delete(url);
    return response.data;
};

export default api; 