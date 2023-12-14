import { Tag } from '../Tag';

import { Container } from './styles';

export function Note({ data, ...rest }) {
  return (
    <Container {...rest}>
      <h1>
        {data.title}
      </h1>

      {
        /**
          * Por quê .map() e nao .forEach()?
          * porque o map gera o retorno de cada iteração
          * ja o forEach nao gera retorno,
          * e como queremos retornar um componente, utilizamos o map 
        */
      }
      {
        data.tags &&
        <footer>
          {data.tags.map((tag) =>
            <Tag
              key={tag.id}
              title={tag.name}
            />
          )}
        </footer>
      }
    </Container>
  )
}