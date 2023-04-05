import { MagnifyingGlass } from "phosphor-react";
import { useForm } from "react-hook-form";
import { SearchFormContainer } from "./styles";
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from "react";
import { TransactionsContext } from "../../../contexts/TransactionsContext";

export function SearchForm() {
  const { fetchTransactions } = useContext(TransactionsContext)

  const searchFormSchema = zod.object({
    query: zod.string()
  })

  type SearchFormInput = zod.infer<typeof searchFormSchema>

  const { 
    register, 
    handleSubmit, 
    formState: { isSubmitting } 
   } = useForm<SearchFormInput>({
    resolver: zodResolver(searchFormSchema)
  })

  async function handleSearchTransactions(data: SearchFormInput) {
    await fetchTransactions(data.query)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input 
        type="text" 
        placeholder="Busque por transações"
        {...register('query') } 
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass />
        Buscar
        </button>
    </SearchFormContainer>
  )
}