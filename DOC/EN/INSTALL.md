#INSTALL UPPERCASE.IO

1. Install all prerequisites below.

    * [Node.js](http://nodejs.org)
    * [MongoDB](http://www.mongodb.org)
    * [ImageMagick](http://www.imagemagick.org)

2. git clone UPPERCASE.IO into appropriate directory.

	```
    git clone https://github.com/Hanul/UPPERCASE.IO.git
    ```

3. Register UPPERCASE.IO Directory as Environment(path) Variable.

	* `Windows` Register your cloned directory to `UPPERCASE_IO_PATH` followed by: Computer - Properties - Advanced System Settings - Environment Variables. (please turn CMD off and on again after registering path.)
	* `Mac`

        ```
        vi .profile
        export UPPERCASE_IO_PATH="{{cloned directory}}"
        ```

	* `Linux`

        ```
        vi .bash_profile
        or
        vi .profile
        export UPPERCASE_IO_PATH="{{cloned directory}}"
        ```

	`.profile` or `.bash_profile` turn off the terminal and on again if the file is modified.

4. [Create Project](CREATE_PROJECT.md).

Next Up: [Create Project](CREATE_PROJECT.md)
