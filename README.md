# vue-d3-charts

**The development of this library is frozen for now. When I have more time I will continue its development. Any contribution is welcome**

Simply yet configurable charts build with D3.

### Install

```bash
npm install --save vue-d3-charts-hire3x
```

### Usage

Import:

```javascript
import { D3BarChart } from "vue-d3-charts";
```

Template:

```html
<D3BarChart :config="config" :datum="data"></D3BarChart>
```

Configuration and data:

```javascript
// data
data = [
  {
    name: "Lorem",
    total: 30,
  },
  {
    name: "Ipsum",
    total: 21,
  },
  {
    name: "Dolor",
    total: 20,
  },
];

// Configuration
config = {
  key: "name",
  value: "total",
  color: "steelblue",
};
```

### Contributing

### License
