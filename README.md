# homecontrol_front

Client for IOT server [Homecontrol_fastapi](https://github.com/Bialri/homecontrol_fastapi)

## Setup for develop
<p>In the root directory create .env file with following settings</p>

```dotenv
VITE_HOST=http(s)://your_host.com/
```
<p>Then you can run local server</p>

```sh
npm install
npm run dev
```

## Setup for deploy

<p>Configure the port of the host machine that you want to use</p>

```yaml
    ports:
      - 'your_port:8080'
```

# Avaliable features

## Registration and login
![image](./readme_img/loging.png)

## Switch control
![image](./readme_img/switch_conrol.png)
<b>changing switch names</b>
![image](./readme_img/switch_edit.png)

## Scripts

### Creating and editing scripts
![image](./readme_img/script_creating.png)
![image](./readme_img/scrtipt_editing.png)
### Managing script actions
![image](./readme_img/actions_managing.png)

### Non-scheduled script execution is also available