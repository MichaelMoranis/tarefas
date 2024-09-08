# Lista de tarefas com armazenamento no localstorage do navegador.

Nesta aplicação implemento a funcionalidade de salvar dados no armazenamento interno do navegador - o localstorage.

Currently, two official plugins are available:

## Rodar a aplicação localmente.

Baixe ou clone o projeto localmente e rode: 

```
npm install
```
depois de concluir o dowload das dependências de desenvolvimento execute: 

```
npm run dev
```
e terá seu url como: "http://localhost:5173".

## Motivo 

O uso do localstorage é simples e rapído quando se tem poucos dados sendo armazenados e também para buscar esses dados bem como persistir o mesmo localmente para quando recarregar a pagina eles permaneçam disponíveis para uso. 

Para realizar esse procedimento utilizei do hook useEffect do React, dessa forma: 



```javascript
  const [input, SetInput] = useState("");
  const [valueItem, setValueItem] = useState<TodoListProps[]>(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      try {
        const parsedTasks = JSON.parse(storedTasks);
        if (Array.isArray(parsedTasks)) {
          return parsedTasks;
        }
      } catch (e) {
        console.error("Falha ao analisar as tarefas do localStorage", e);
      }
    }
    return [];
  });
  // aqui estou atualizando o localstorage sempre que "valueItem no [array] mudar"
  useEffect(() => {
      localStorage.setItem("tasks", JSON.stringify(valueItem)); 
      console.log("Tarefas salvas no localStorage:", valueItem); 
  }, [valueItem]);

```
e fazendo uso de funções que adicionam e removem dados do armazenamento local. 

```javascript
// funcao para adicionar elementos na lista
  function addInput(newText: string) {
    if (input.trim() != "") {
      setValueItem((prevValue: TodoListProps[]) => {
        const newInput: TodoListProps = {
          id: prevValue.length
            ? Math.max(...prevValue.map((item) => item.id)) + 1
            : 1,
          text: newText,
          isChecked: false
        };
        return [...prevValue, newInput];
      });
      SetInput("");
    }
  }

  // funcao para deletar itens na lista
  function deleteItem(id: number) {
    const newListValue = valueItem.filter((value) => value.id !== id);
    setValueItem(newListValue);
  }

```
se leu até contribuia no projeto, todas as sugestões são bem vindas !!!
