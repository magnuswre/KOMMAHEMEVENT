"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Home = () => {
    return (<div>
      <div className="Links">
        <react_router_dom_1.Link className="" to="/register">
          Registrera
        </react_router_dom_1.Link>
        <react_router_dom_1.Link className="" to="/login">
          Logga in
        </react_router_dom_1.Link>
      </div>
    </div>);
};
exports.default = Home;
