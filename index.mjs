// Initialize Firebase

import { firebaseConfig, auth, database } from './firebase.mjs';
import {PropertyCard} from "./PropertyCard.mjs"
import {createHeader} from "./Header.mjs"
import {Footer} from "./Footer.mjs"
import {PropertyList} from "./PropertyList.mjs"
import {getPropertyList} from "./api.mjs"
const newHeader = createHeader();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( /*#__PURE__*/newHeader);
const newFooter=Footer()
const foot=ReactDOM.createRoot(document.getElementById('foot'));
foot.render(newFooter)

const propertyList = document.getElementById('propertyList');

const pr=ReactDOM.createRoot(propertyList)
//const newpr= PropertyList()
//console.log(newpr)
//pr.render(newpr)
const datalist=await getPropertyList()
const newp =PropertyList( {datalist})
pr.render(newp)

  
  
