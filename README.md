# quaesitor-cli
A node-based command–line interface for *QUAESITOR*.

*QUAESITOR* locates Latin scientific names in Chinese, Czech, Danish, Dutch, English, French, German, Italian, Japanese, Latin, Norwegian, Polish, Portuguese, Russian, Spanish, and Swedish text (approximately 96% of biodiversity titles). It uses a combination of pattern matching (regular expressions), a Bloom filter, and a trio of complementary ensembled neural networks. A [live version](https://www.nybg.org/files/scientists/dlittle/quaesitor-web/) of the web interface is hosted at the New York Botanical Garden.

### install
```bash
npm install quaesitor-cli
ln -s node_modules/quaesitor-cli/dist/index.js quaesitor
```
Due to the way @tensorflow/tfjs-node installs, using the ‘-g’ (‘--global’) option, does not work on many systems. The local npm install, shown above, was tested on Ubuntu 18.04 (node v10.19.0) and MacOS 10.14 (node v12.16.1).

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
echo 'Text with one or more Latin Scientific names, such as Cupressus funebris Endl., embedded within it.' | quaesitor
### should output 'Cupressus funebris'
```

### citation
If you use this software, please cite: Little, D.P. 2020. Recognition of Latin scientific names using artificial neural networks. [Applications in Plant Sciences 8(7): e11378.](https://doi.org/10.1002/aps3.11378)

### license
[MIT](https://github.com/dpl10/quaesitor-cli/blob/master/LICENSE)

### related repositories
* [quaesitor](https://github.com/dpl10/quaesitor)
* [quaesitor-web](https://github.com/dpl10/quaesitor-web)
