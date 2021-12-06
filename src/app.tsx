import { CraftBlock } from '@craftdocs/craft-extension-api';
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { SupportedTextStyle, getAllBlocks, textContent } from './utils';

const App: React.FC<{}> = () => {

  const [toc, updateToc] = React.useState<CraftBlock[]>([]);

  React.useEffect(() => {
    generateTableOfContents();
    initEnvListener();
  })

  async function generateTableOfContents() {
    const allBlocks = await getAllBlocks();
    const _toc:CraftBlock[] = [];
    allBlocks.forEach(block => {
      if (block.type === 'textBlock') {
        if (SupportedTextStyle.includes(block.style.textStyle)) {
          _toc.push(block);
        }
      }
    });
    updateToc(_toc);
  }

  async function clickBlock(block: CraftBlock) {
    await craft.editorApi.navigateToBlockId(block.id);
  }

  function initEnvListener() {
    craft.env.setListener((env) => {
      document.body.dataset.theme = env.colorScheme === "light" ? "" : "dark";
    });
  }

  return (
    <div>
      <h1>Index</h1>
      <ul>
        {toc.map(t => <li onClick={async () => await clickBlock(t)}>{textContent(t)}</li>)}
      </ul>
    </div>
  )
}

export function initApp() {
  ReactDOM.render(<App />, document.getElementById('react-root'))
}
