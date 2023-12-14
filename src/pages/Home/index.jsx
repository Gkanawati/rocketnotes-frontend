import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiSearch } from 'react-icons/fi';
import { Container, Brand, Menu, Search, Content, NewNote } from './styles';

import { Note } from '../../components/Note';
import { Input } from '../../components/Input';
import { Header } from '../../components/Header';
import { Section } from '../../components/Section';
import { ButtonText } from '../../components/ButtonText';
import { api } from '../../services/api';

export function Home() {
  const [tags, setTags] = useState([]);
  const [tagsSelected, setTagsSelected] = useState([]);

  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState([]);

  const navigate = useNavigate();

  function handleTagSelected(tagName) {
    if (tagName === 'all') {
      setTagsSelected([]);
      return;
    }
    
    const tagAlreadySelected = tagsSelected.includes(tagName);
    if (tagAlreadySelected) {
      const tagsFiltered = tagsSelected.filter(tag => tag !== tagName);
      setTagsSelected(tagsFiltered);
      return;
    }

    setTagsSelected(prevState => [...prevState, tagName]);
  }

  async function fetchTags() {
    const response = await api.get('/tags')
    setTags(response.data);
  }

  function handleDetails(id) {
    navigate(`/details/${id}`);
  }

  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {
    async function fetchNotes() {
      const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`);
      setNotes(response.data);
    }

    fetchNotes();
  }, [search, tagsSelected])

  return (
    <Container>
      <Brand>
        <h1>Rocketnotes</h1>
      </Brand>

      <Header />

      <Menu>
        <li>
          <ButtonText 
            $isactive={tagsSelected.length === 0}
            title="Todos" 
            onClick={() => handleTagSelected("all")} 
          />
        </li>
        {tags.map(tag => (
          <li key={tag.id}>
            <ButtonText 
              title={tag.name} 
              onClick={() => handleTagSelected(tag.name)} 
              $isactive={tagsSelected.includes(tag.name)}
            />
          </li>
        ))}
      </Menu>

      <Search>
        <Input 
          icon={FiSearch} 
          placeholder="Pesquisar pelo título" 
          search={search}
          onChange={e => setSearch(e.target.value)}
        />
      </Search>

      <Content>
        <Section title="Minhas notas">
          {notes.map(note => {
            return (
              <Note 
                key={String(note.id)} 
                data={note} 
                onClick={() => handleDetails(note.id)}
              />
            )
          })}

          {notes.length === 0 && (
            <h4>Nenhuma nota encontrada 😥</h4>
          )}
        </Section>
      </Content>

      <NewNote to='/new'>
        <FiPlus />
        Criar nota
      </NewNote>
    </Container>
  );
}