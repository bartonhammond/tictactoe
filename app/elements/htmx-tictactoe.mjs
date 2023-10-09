export default function HtmxTicTacToe({ html, state }) {
  return html`
    <style>
      h1 {
        text-align: center;
      }
      td {
        width: 100px;
        height: 100px;
        text-align: center;
        vertical-align: center;
        font-size: 2.5em;
      }
      table {
        margin: 5px auto;
      }
      .vert {
        border-left: 2px solid black;
        border-right: 2px solid black;
      }
      .hori {
        border-top: 2px solid black;
        border-bottom: 2px solid black;
      }
    </style>
    <h1 hx-get="/check?id=${state.instanceID}" hx-trigger="click delay:0.5s from:td">Tic Tac Toe</h1>
    <table>
      <tr>
        <td hx-post="/clicked?pos=0&id=${state.instanceID}" hx-trigger="click"></td>
        <td hx-post="/clicked?pos=1&id=${state.instanceID}" hx-trigger="click" class="vert"></td>
        <td hx-post="/clicked?pos=2&id=${state.instanceID}" hx-trigger="click"></td>
      </tr>
      <tr>
        <td hx-post="/clicked?pos=3&id=${state.instanceID}" hx-trigger="click" class="hori"></td>
        <td hx-post="/clicked?pos=4&id=${state.instanceID}" hx-trigger="click" class="vert hori"></td>
        <td hx-post="/clicked?pos=5&id=${state.instanceID}" hx-trigger="click" class="hori"></td>
      </tr>
      <tr>
        <td hx-post="/clicked?pos=6&id=${state.instanceID}" hx-trigger="click"></td>
        <td hx-post="/clicked?pos=7&id=${state.instanceID}" hx-trigger="click" class="vert"></td>
        <td hx-post="/clicked?pos=8&id=${state.instanceID}" hx-trigger="click"></td>
      </tr>
    </table>
  `;
}
