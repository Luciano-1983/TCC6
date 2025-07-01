#Include "protheus.ch"

User Function Calculadora()
    Local nOpcao := 0
    Local nNum1 := 0
    Local nNum2 := 0
    Local nResultado := 0

    While nOpcao <> 5
        nOpcao := Val(InputBox("Escolha a opcao:\n1 - Soma\n2 - Subtracao\n3 - Multiplicacao\n4 - Divisao\n5 - Sair","Calculadora"))

        If nOpcao >= 1 .And. nOpcao <= 4
            nNum1 := Val(InputBox("Primeiro numero:","Calculadora"))
            nNum2 := Val(InputBox("Segundo numero:","Calculadora"))
        EndIf

        Do Case
        Case nOpcao == 1
            nResultado := nNum1 + nNum2
            MsgInfo("Resultado: " + cValToChar(nResultado),"Soma")
        Case nOpcao == 2
            nResultado := nNum1 - nNum2
            MsgInfo("Resultado: " + cValToChar(nResultado),"Subtracao")
        Case nOpcao == 3
            nResultado := nNum1 * nNum2
            MsgInfo("Resultado: " + cValToChar(nResultado),"Multiplicacao")
        Case nOpcao == 4
            If nNum2 == 0
                MsgStop("Divisao por zero nao e permitida","Erro")
            Else
                nResultado := nNum1 / nNum2
                MsgInfo("Resultado: " + cValToChar(nResultado),"Divisao")
            EndIf
        Case nOpcao == 5
            ConOut("Saindo da calculadora...")
        Otherwise
            ConOut("Opcao invalida")
        EndCase
    EndDo
Return
