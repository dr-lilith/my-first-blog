import styles from "./Counter.module.css"
import React, { useState, useEffect } from 'react';

const Counter=()=> {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    fetch("/posts")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  // return (
  //   <div className={styles.container}>
  //     <h1>Counter</h1>
  //     <div>
  //       <button>-</button>
  //       <span>0</span>
  //       <button>+</button>
        
  //     </div>
  //   </div>
  // );
  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.author_id_id} {item.title} {item.text}
          </li>
        ))}
      </ul>
    );
  }

}

export default Counter;
