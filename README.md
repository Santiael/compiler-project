# Compiler Project

Esse é um projeto desenvolvido na UNIFACS para disciplina Compiladores

## Instalação

1. Baixe e instale o [node](https://nodejs.org/pt-br/)
2. Clone este repositório, ou baixe clicando [aqui](https://github.com/Santiael/compiler-project/archive/master.zip)
3. Abra o terminal dentro da pasta do projeto
4. Instale as dependências com o comando `npm i`

## Execução

`npm start [-- flags]`

#### exemplo:

```
npm start -- -s ./sample/source.code
```

Caso não seja indicado nenhum arquivo para compilação, será utilizado o arquivo `sample/source.code`.
O resultado da compilação estará na pasta `output`, que será criada caso não exista previamente.

### Flags:

- `-s` `--source <file_path>` - Para indicar qual arquivo deve ser compilado, substitua `<file_path>`.
- `-v` `--verbose` - Para imprimir no console os resultados da execução de cada módulo.

## License

[MIT](https://choosealicense.com/licenses/mit/)
