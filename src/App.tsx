import { useState } from 'react';
import useSWR from 'swr';

import { Photo } from './views/Photo';
import { Size } from './views/Size';
import { Products } from './views/Products';
import { Placeholder } from './components/Placeholder';
import { Configurator } from './components/Configurator';

import addPhotoIcon from './assets/add-photo.svg';
import productsIcon from './assets/products.svg';
import sizeIcon from './assets/size.svg';
import addIcon from './assets/add.svg';
import subtractIcon from './assets/subtract.svg';
import rotateIcon from './assets/rotate.svg';

import { Model, RoomSize, VIEW } from './types';

import { AppContext } from './context/AppContext';
import { fetcher } from './utils/fetcher';
import { useModels } from './components/useModels';
import useOutsideClick from './hooks/useOutsideClick';

export const API = {
  translations: 'https://edelweiss-admin-panel.azurewebsites.net/api/v1/cms/pages/mobile?path=settings',
  categories: 'https://edelweiss-admin-panel.azurewebsites.net/api/categories',
  // products: 'https://edelweiss-admin-panel-staging.azurewebsites.net/api/v1/products/search',
  // products: 'https://edelweiss-admin-panel-staging.azurewebsites.net/api/v1/products/search/configurator',
  products: 'https://edelweiss-admin-panel.azurewebsites.net/api/v1/products/search/configurator'
};


function App() {
  const [view, setView] = useState<VIEW>(VIEW.Size);
  const [roomSize, setRoomSize] = useState<RoomSize>();
  const [texture, setTexture] = useState<string>('');
  // const [listOfModels, setListOfModels] = useState<string[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  // const [activeSection, setActiveSection] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [tooltip, setTooltip] = useState(false);
  const [zoom, setZoom] = useState(1);
  // const [showControls, setShowControls] = useState(true);

  const [addLoadedModel, loadedModels] = useModels();

  const searchParams = new URLSearchParams(document.location.search); console.log(searchParams.get('language') ? API.translations + searchParams.toString() : API.translations);

  const { data: translationsData, error:_translationsDataError, isLoading: translationsDataIsLoading } = useSWR(searchParams.get('language') ? API.translations + '?' + searchParams.toString() : API.translations, fetcher);
  const translations = translationsData?.contentSections[0].properties;
  const { data: categoriesData, error:_categoriesDataError, isLoading: _categoriesDataIsLoading } = useSWR(searchParams.get('language') ? API.translations + '?' +  searchParams.toString() : API.categories, fetcher);

  const buttonRef = useOutsideClick(() => setTooltip(false));

  const handleTextureImage = (texture:string) => {
    setTexture(texture);
  };

  const addModel = (model:Model) => {
    addLoadedModel(model.name);
    setModels((state) => [...state, model]);
  };

  const rotateHandler = () => {
    if (!selectedItem) return;
    setModels(state => (state.map(model => model.id === selectedItem ? {...model, rotation: model.rotation + 90} : model)));
  };

  return (
    <AppContext.Provider value={{
      translations,
      categories: categoriesData,
      models,
      texture,
      roomSize,
      loadedModels,
      zoom,
    }}>
    <main className="font-manrope text-ed-black2 rounded-tl-[30px] rounded-tr-[30px] bg-[#F2F4F5] min-h-screen grid grid-cols-[140px,_500px,_auto] relative">
      <nav>
        <ul className='p-[20px] flex flex-col gap-[10px] text-sm'>
          <li>
            <button 
              className={`rounded-[5px] border-0 flex items-center flex-col p-[10px] pt-[20px] w-[100px] cursor-pointer ${view === VIEW.Size ? "bg-[#FFDE44]" : "bg-[#DEDEDE]"}`}
              onClick={() => setView(VIEW.Size)}    
            >
              <img src={sizeIcon} alt='wymiary lokalu' className='w-[30px] mb-2' />
              {!translationsDataIsLoading && <span>{translations?.find(({ id }: {id:string}) => id === 'menu-store-size')?.value}</span>}
            </button>
          </li>
          <li>
            <button 
              className={`rounded-[5px] border-0 flex items-center flex-col p-[10px] pt-[20px] w-[100px] cursor-pointer ${view === VIEW.Photo ? "bg-[#FFDE44]" : "bg-[#DEDEDE]"}`}
              onClick={() => setView(VIEW.Photo)}  
            >
              <img src={addPhotoIcon} alt='zdjęcie lokalu' className='w-[30px] mb-2' />
              {!translationsDataIsLoading && <span>{translations?.find(({ id }: {id:string}) => id === 'menu-photo')?.value}</span>}
            </button>
          </li>
          <li>
            <button 
              className={`rounded-[5px] border-0 flex items-center flex-col p-[10px] pt-[20px] w-[100px] cursor-pointer ${view === VIEW.Products ? "bg-[#FFDE44]" : "bg-[#DEDEDE]"}`}
              onClick={() => setView(VIEW.Products)}  
            >
              <img src={productsIcon} alt='dostępne produkty' className='w-[30px] mb-2' />
              {!translationsDataIsLoading && <span>{translations?.find(({ id }: {id:string}) => id === 'menu-products')?.value}</span>}
            </button>
          </li>
        </ul>
      </nav>
      <div className='bg-white py-[40px] px-[50px]'>

        {view === VIEW.Size && <Size setSize={setRoomSize} />}
        {view === VIEW.Photo && <Photo setImage={handleTextureImage} />}
        {view === VIEW.Products && <Products addModel={addModel} />}

      </div>
      <div>
        {roomSize ? <Configurator selectedItem={selectedItem} setSelectedItem={setSelectedItem} /> : <Placeholder onClick={() => setView(VIEW.Size)} />}
      </div>


      {roomSize && <div className='flex flex-col gap-[10px] absolute right-[30px] top-[26px]'>
        <button type='button' className='rounded-[4px] bg-ed-white p-[10px] cursor-pointer' onClick={() => setZoom(zoom => zoom+0.05)}><img src={addIcon} alt="add" className='w-[20px] h-[20px]' /></button>
        <button type='button' className='rounded-[4px] bg-ed-white p-[10px] cursor-pointer' onClick={() => setZoom(zoom => zoom === 1 ? zoom : zoom-0.05)}><img src={subtractIcon} alt="add" className='w-[20px] h-[20px]' /></button>
        {selectedItem && <button type='button' className='rounded-[4px] bg-ed-white p-[10px] cursor-pointer' onClick={rotateHandler}><img src={rotateIcon} alt="add" className='w-[20px] h-[20px]' /></button>}
      </div>}

      {roomSize && (
        <button
         type='button'
         ref={buttonRef as React.LegacyRef<HTMLButtonElement> | undefined}
         className='absolute top-[26px] left-[670px] flex gap-1 rounded-[4px] bg-ed-white px-2 py-4 hover:bg-ed-yellow cursor-pointer'
         onClick={(e) => {
            e.stopPropagation();
            setTooltip(!tooltip);
          }}
         >
          <span className='block w-2 h-2 rounded-full border border-ed-black2'></span>
          <span className='block w-2 h-2 rounded-full border border-ed-black2'></span>
          <span className='block w-2 h-2 rounded-full border border-ed-black2'></span>

          {tooltip && <ul className='absolute bg-ed-white rounded-[4px] p-4 flex flex-col shadow-sm top-full left-0 mt-[10px]'>
            <li className='font-manrope text-sm whitespace-nowrap text-ed-error' onClick={() => {
              setTooltip(false);
              setModels([]);
              setSelectedItem('');
              setTexture('')
            }}>Usuń szablon</li>
          </ul>}
        </button>
      )}

    </main>
    </AppContext.Provider>
  )
}

export default App;
