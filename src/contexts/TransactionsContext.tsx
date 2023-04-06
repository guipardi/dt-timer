import { ReactNode, useCallback, useEffect, useState } from 'react'
import { api } from '../lib/axios'
import { createContext } from 'use-context-selector'

/* 
Porque um componente renderiza?
1) Hooks mudaram (mudou um estado, mudou um reducer, mudou um effect)
2) Props mudam
3) Componentes PAI rerendered

Fluxo de renderização
1) React cria o HTML da interface daquele componente
2) Compara a ersão do HTML recriada com a versão anterior
3) SE mudou alguma coisa, ele reescreve o HTML na tela

MEMO
Adiciona o passo 0
0.1) Realiza um deep comparinson, basicamente verifica se as hooks ou as props mudaram,
      se mudaram, ele vai permitir a renderização do react
*/

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface TransactionsProviderProps {
  children: ReactNode
}

interface CreateTransactionInput {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface TransactionsContextType {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransactions: (data: CreateTransactionInput) => Promise<void>
}

export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })

    setTransactions(response.data)
  }, [])

  const createTransactions = useCallback(
    async (data: CreateTransactionInput) => {
      const { description, price, category, type } = data

      const response = await api.post('/transactions', {
        description,
        price,
        category,
        type,
        createdAt: new Date(),
      })

      setTransactions((state) => [response.data, ...state])
    },
    [],
  )

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransactions }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
