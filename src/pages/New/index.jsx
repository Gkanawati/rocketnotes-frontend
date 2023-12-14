import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Input } from '../../components/Input';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { Section } from '../../components/Section';
import { NoteItem } from '../../components/NoteItem';
import { TextArea } from '../../components/TextArea';

import { Container, Form } from './styles';
import { api } from '../../services/api';
import { ButtonText } from '../../components/ButtonText';

export function New() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [newLink, setNewLink] = useState("");
  const [links, setLinks] = useState([]);

  const [newTag, setNewTag] = useState("");
  const [tags, setTags] = useState([]);

  const navigate = useNavigate();

  function handleAddLink() {
    if (!newLink) {
      return;
    }
    setLinks(prevState => [...prevState, newLink]);
    setNewLink("");
  }

  function handleRemoveLink(deletedLink) {
    setLinks(prevState => prevState.filter(link => link !== deletedLink));
  }

  function handleAddTag() {
    if (!newTag) {
      return;
    }
    setTags(prevState => [...prevState, newTag]);
    setNewTag("");
  }

  function handleRemoveTag(deletedTag) {
    setTags(prevState => prevState.filter(tag => tag !== deletedTag))
  }

  function handleBack() {
    navigate(-1);
  }

  async function handleNewNote() {
    if (!title) {
      return alert('Digite o título da nota.')
    }
    if (newLink) {
      return alert('Você deixou um link no campo para adicionar, mas não adicionou.')
    }
    if (newTag) {
      return alert('Você deixou uma tag no campo para adicionar, mas não adicionou.')
    }

    await api.post('/notes', {
      title,
      description,
      links,
      tags
    });

    alert('Nota criada com sucesso!');
    navigate(-1);
  }

  return (
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>

            <ButtonText 
              title="Voltar" 
              onClick={handleBack} 
            />
          </header>

          <Input
            placeholder="Título"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <TextArea 
            placeholder="Observações" 
            value={description} 
            onChange={e => setDescription(e.target.value)}
          />

          <Section title="Links úteis">
            {links.map((link, index) => (
              <NoteItem
                key={String(index)}
                value={link}
                onClick={() => handleRemoveLink(link)}
              />
            ))}
            <NoteItem
              isNew
              placeholder="Novo link"
              value={newLink}
              onChange={e => setNewLink(e.target.value)}
              onClick={handleAddLink}
            />
          </Section>

          <Section title="Marcadores">
            <div className='tags'>
              {tags.map((tag, index) => (
                <NoteItem 
                  key={String(index)}
                  value={tag}
                  onClick={() => handleRemoveTag(tag)}
                />
              ))}
              <NoteItem 
                isNew 
                placeholder="Nova Tag" 
                onChange={e => setNewTag(e.target.value)}
                value={newTag}
                onClick={handleAddTag}
              />
            </div>
          </Section>

          <Button 
            title="Salvar" 
            onClick={handleNewNote}
          />
        </Form>
      </main>
    </Container>
  )
}