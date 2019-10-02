# quaesitor-cli
A node-based command–line interface for quaesitor.

Quaesitor locates Latin scientific names in Chinese, Czech, Danish, Dutch, English, French, German, Italian, Japanese, Latin, Norwegian, Polish, Portuguese, Russian, Spanish, and Swedish text (approximately 96% of biodiversity titles). It uses a combination of pattern matching (regular expressions) and a trio of complementary ensembled neural networks. A [live version](https://www.nybg.org/files/scientists/dlittle/quaesitor.html) of the web interface is hosted at the New York Botanical Garden.

### install
`npm install quaesitor-cli -g`

### use
```bash
### file in + file out
quaesitor [ -h ] -i input-file.txt -o output-file
### file in + stream out
quaesitor [ -h ] -i input-file.txt | program
### stream in + file out
cat input-file.txt | quaesitor [ -h ] -o output-file
### stream in + stream out
cat input-file.txt | quaesitor [ -h ] | program
```

### sample input/output
```bash
echo 'Text with one or more Latin Scientific names, such as Cupressus sempervirens L., embedded within it.' | quaesitor
# should output 'Cupressus sempervirens'
```

### citation
If you use this software, please cite: Little, D.P. Submitted. Recognition of Latin scientific names using artificial neural networks. [Applications in Plant Sciences.](https://doi.org/ADD_DOI)

### license
[MIT](https://github.com/dpl10/quaesitor-cli/blob/master/LICENSE)

### related repositories
* [quaesitor](https://github.com/dpl10/quaesitor)
* [quaesitor-web](https://github.com/dpl10/quaesitor-web)
