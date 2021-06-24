import { createContext, ReactNode, useState, useEffect } from "react";
import { firebase, auth, database } from "../services/firebase";

type User = {
  id: string;
  name: string;
  avatar: string;
};

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error(
            "Está faltando informações da sua conta google. Nome ou Foto."
          );
        }

        // pegando os dados do usuario já logado
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function signInWithGoogle() {
    // realizando a auth
    const provider = new firebase.auth.GoogleAuthProvider();

    // pegando o resultado da auth
    const result = await auth.signInWithPopup(provider);

    // verificando se está tudo correto com a auth
    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      if (!displayName || !photoURL) {
        throw new Error(
          "Está faltando informações da sua conta google. Nome ou Foto."
        );
      }

      // pegando os dados do usuario já logado
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  }
  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}
