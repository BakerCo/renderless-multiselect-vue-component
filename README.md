# Renderless multiselect vue component

This component is not intended for production use, it was created to serve a personal need to have a simple version of the millions of multiselect vue components that already exist.

## Installation
```shell
$ npm i @bakerco/v-mselect
```

## Usage
Two methods are exposed:
* addOption(event) which takes a form input/select event that will grab the value of that input
* removeTag(tag) which tags the value of a tag and removes it

Two option types are currently supported, the first being an array of strings
```javascript
  let options = ['Option1', 'Option2', ...];
```
the second being an array of objects with key and value as the two properties.
```javascript
  let options = [{key: 'some_id',value: 'some label'}, ...];
```

below is an example of the array string options...
```html
<v-mselect v-model="tags" :options="options">
  <div slot-scope="{ tags, options, addOption, removeTag }">
    <div>
      <span v-for="tag in tags" :key="tag">
        {{ tag }}
        <button type="button" @click="removeTag(tag)">&times;</button>
      </span>	
    </div>
    <select @change="addOption($event)">
      <option :value="null">- Select -</option>
      <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
    </select>
  </div>
</v-mselect>
```
and the object option variant...
```html
<v-mselect v-model="tags" :options="options">
  <div slot-scope="{ tags, options, addOption, removeTag }">
    <div>
      <span v-for="tag in tags" :key="tag">
        {{ tag }}
        <button type="button" @click="removeTag(tag)">&times;</button>
      </span>	
    </div>
    <select @change="addOption($event)">
      <option :value="null">- Select -</option>
      <option v-for="(option, key) in options" :key="key" :value="option.key">{{ option.value }}</option>
    </select>
  </div>
</v-mselect>
```
