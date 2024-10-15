import java.util.Scanner;

public class CriptografarMensagens {

    public static void main(String[] args) {

        Scanner teclado = new Scanner(System.in);

        // -------------------------------------------------------------------------------------

        char letras[] = { ' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',

                'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };

        int codificacao[] = { 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83,

                89, 97, 101, 103 };

        // -------------------------------------------------------------------------------------

        System.out.print("Insira a mensagem --> ");

        String msg = teclado.nextLine();

        msg = msg.toUpperCase();

        System.out.println();

        // -------------------------------------------------------------------------------------

        int[] mensagemCriptografada = criptografar(msg, letras, codificacao);

        int numColunas = (int) Math.ceil(mensagemCriptografada.length / 2.0);

        int linhas = 2;

        int[][] B = new int[linhas][numColunas];

        for (int i = 0; i < mensagemCriptografada.length; i++) {

            int linha = i / numColunas;

            int coluna = i % numColunas;

            B[linha][coluna] = mensagemCriptografada[i];

        }

        System.out.println("MENSAGEM SEM CRIPTOGRAFIA");

        for (int i = 0; i < linhas; i++) {

            System.out.print('[');

            for (int j = 0; j < numColunas; j++) {

                System.out.print(B[i][j]);

                if (j < B[i].length - 1) {

                    System.out.print(" ");

                }

            }

            System.out.println(']');

        }

        // ----------------------------------------------------------------------------------------------------

        System.out.println();

        System.out.println("CHAVE DE CRIPTOGRAFIA");

        System.out.println("[4 5]");

        System.out.println("[3 4]");

        int A[][] = { { 4, 5 }, { 3, 4 } };

        System.out.println();

        int determinanteA = determinante(A);

        System.out.println("O determinante da Chave é: " + determinanteA);

        System.out.println();

        // ----------------------------------------------------------------------------------------------------

        int[][] C = multiplicarMatrizes(A, B);

        System.out.println("MENSAGEM CRIPTOGRAFADA COM SUCESSO!");

        for (int i = 0; i < C.length; i++) {

            System.out.print("[");

            for (int j = 0; j < C[i].length; j++) {

                System.out.print(C[i][j]);

                if (j < C[i].length - 1) {

                    System.out.print(" ");

                }

            }

            System.out.println("]");

        }

        // --------------------------------------------------------------------------------------------

        int inversaA[][] = inversa(A, determinanteA);

        int descriptografada[][] = multiplicarMatrizes(inversaA, C);

        System.out.println();

        System.out.println("DECODIFICAÇÃO DA MENSAGEM");

        for (int i = 0; i < descriptografada.length; i++) {

            System.out.print("[");

            for (int j = 0; j < descriptografada[i].length; j++) {

                System.out.print(descriptografada[i][j]);

                if (j < C[i].length - 1) {

                    System.out.print(" ");

                }

            }

            System.out.println("]");

        }

        // -------------------------------------------------------------------------------------------

        int msgd[] = new int[descriptografada[0].length * 2];

        for (int j = 0; j < descriptografada[0].length; j++) {

            msgd[j] = descriptografada[0][j];

            msgd[j + descriptografada[0].length] = descriptografada[1][j];

        }

        String decodificada = "";

        for (int i = 0; i < msgd.length; i++) {

            int valor = msgd[i];

            int indice = indexOfC(codificacao, valor);

            if (indice != -1) {

                decodificada += letras[indice];

            }

        }

        System.out.println();

        System.out.print("Mensagem Decodificada: " + decodificada);

    }

    // ---------------------------------------------------------------------------------------------------

    public static int[][] multiplicarMatrizes(int[][] A, int[][] B) {

        int linhasA = A.length;

        int colunasA = A[0].length;

        int colunasB = B[0].length;

        if (colunasA != B.length) {

            System.out.println("Numero de colunas da matriz A deve ser igual ao número de linhas!");

        }

        int[][] C = new int[linhasA][colunasB];

        for (int i = 0; i < linhasA; i++) {

            for (int j = 0; j < colunasB; j++) {

                for (int k = 0; k < colunasA; k++) {

                    C[i][j] += A[i][k] * B[k][j];

                }

            }

        }

        return C;

    }

    public static int determinante(int[][] matriz) {

        int n = matriz.length;

        int det = (matriz[0][0] * matriz[1][1]) - (matriz[0][1] * matriz[1][0]);

        if (det != 0) {

            return det;

        }

        else {

            throw new IllegalArgumentException("Erro: o determinante não pode ser 0.");

        }

    }

    public static int indexOfC(int[] codificacao, int valor) {

        int i = -1;

        int cont = 0;

        for (int j = 0; j < codificacao.length; j++) {

            if (codificacao[j] == valor) {

                i = cont;

                break;

            }

            cont++;

        }

        return i;

    }

    // INDICE DE LETRAS

    public static int indexOfL(char[] letras, int valor) {

        int i = -1;

        int cont = 0;

        for (int j = 0; j < letras.length; j++) {

            if (letras[j] == valor) {

                i = cont;

                break;

            }

            cont++;

        }

        return i;

    }

    public static int[] criptografar(String msg, char[] letras, int[] codificacao) {

        int msgCriptografada[] = new int[msg.length()];

        for (int i = 0; i < msg.length(); i++) {

            int valor = msg.charAt(i);

            int letraIndice = indexOfL(letras, valor);

            int codigoIndice = codificacao[letraIndice];

            msgCriptografada[i] = codigoIndice;

        }

        return msgCriptografada;

    }

    public static int[][] inversa(int[][] A, int determinanteA) {

        int[][] inversaA = new int[2][2];

        inversaA[0][0] = A[1][1] / determinanteA;

        inversaA[0][1] = -A[0][1] / determinanteA;

        inversaA[1][0] = -A[1][0] / determinanteA;

        inversaA[1][1] = A[0][0] / determinanteA;

        return inversaA;

    }

}