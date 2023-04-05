import { MagnifyingGlass } from "phosphor-react";
import { useForm } from "react-hook-form";
import { SearchFormContainer } from "./styles";
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

export function SearchForm() {
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

  function handleSearchTransactions(data: SearchFormInput) {

    console.log(data);
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