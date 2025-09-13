Node.js process debugging environment
- - - - - - - - - - - - - - - - - - -

Environment creation:
Download rizsotto/Bear - clangd compilation database initialization
tool from non CMake configured builds.

$ git clone https://github.com/rizsotto/Bear
$ mkdir build && cd build
$ cmake .. -DENABLE_UNIT_TESTS=OFF -DENABLE_FUNC_TESTS=OFF {-G "Unix Makefiles"}
$ make {-j 100}

Download Node.js source files itself:
$ git clone https://github.com/nodejs/node
$ ./configure --debug
$ {path/to/bear} -- make {-j 104}

.vscode directory contains launch config for node debugging, place
in node source files directory.
