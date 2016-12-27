Imports AJKontroller.webApiHelpers.bokemonHandler


Partial Class DesktopModules_barnensbiblService_bokemonApi_bokemonService
    Inherits System.Web.UI.Page
    Private _userid As Integer = 0
    Private _monsterid As Integer = 0
    Private _timetonext As Integer = 0
    Private _isjsonp As Boolean = False
    Private _callback As String = ""

    'Anrop till service
    'Dependencies: måste ha userid för att anropa service
    'hämta alla bokemonster
    'kivdev.se/DesktopModules/barnensbiblService/bokemonApi/bokemonService.aspx?devkey=monster&cmdtyp=allmon&userid=105
    'hämta användarens bokemonster
    'kivdev.se/DesktopModules/barnensbiblService/bokemonApi/bokemonService.aspx?devkey=monster&cmdtyp=usrmon&userid=105
    'Lägg till bokemonster till användaren
    'kivdev.se/DesktopModules/barnensbiblService/bokemonApi/bokemonService.aspx?devkey=monster&cmdtyp=addmon&userid=105&monid=3

    Protected Sub Page_Init(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Init

        Dim devkey As Object = Request.QueryString("devkey")
        Dim commandtyp As Object = Request.QueryString("cmdtyp")

        getrequest()

        If devkey IsNot Nothing Then
            If devkey.ToString = "monster" Then

                Response.ContentType = "text/javascript"

                If Not String.IsNullOrEmpty(commandtyp) Then

                    If _isjsonp Then
                        Response.Write(_callback & "(" & getbokemondata(commandtyp) & ")")
                    Else
                        Response.Write(getbokemondata(commandtyp))
                    End If

                Else

                    Response.Write("Error")

                End If
            Else
                Response.Write("Du är inte behörig!")

            End If
        Else
            Response.Write("Välkommen till BokemonAPI!")

        End If
    End Sub

    Private Function getbokemondata(ByVal cmdtyp As String) As String
        Dim retstr As String = "test"

        Dim obj As New bokemonController
        If Not _userid <= 0 Then
            Select Case cmdtyp
                Case "allmon"
                    retstr = createBokemonJson(obj.getbaseAllMonsterList(_userid))

                Case "usrmon"
                    retstr = createBokemonJson(obj.getbaseUserAndMonsterList(_userid))

                Case "addmon"
                    retstr = createBokemonJson(obj.MonsterToUserList(_userid, _monsterid))

                Case "alldrakar"
                    retstr = createBokemonJson(obj.getbaseAllDrakarList(_userid))
            End Select
        Else
            retstr = "" ' return empty objeckt
        End If
        Return retstr

    End Function



    Private Function getrequest() As Boolean

        Dim ret As Boolean = False
        Dim jsn As Object = Request.QueryString("json")
        Dim callb As Object = Request.QueryString("callback")

        Dim usrid As Object = Request.QueryString("userid")
        Dim monsterid As Object = Request.QueryString("monid")

        ret = True
        If Not String.IsNullOrEmpty(usrid) And usrid <> "null" Then
            _userid = CInt(usrid)
        Else
            _userid = 0
            ret = False
        End If

        If Not String.IsNullOrEmpty(monsterid) And monsterid <> "null" Then
            _monsterid = CInt(monsterid)
        End If


        If Not String.IsNullOrEmpty(jsn) Then
            If jsn = "p" Then
                _isjsonp = True
            Else
                _isjsonp = False
            End If

        Else
            _isjsonp = False
        End If

        If Not String.IsNullOrEmpty(callb) Then
            _callback = callb
        End If


        Return ret

    End Function

    Public Function createBokemonJson(ByVal obj As bokemonInfo) As String
        Dim status As Integer = 1

        Dim sb As New StringBuilder

        Dim i As Integer = 0
        sb.Append("{") '{1-1}        
        sb.Append("""barnensbibliotek"" : {") '{2-1}
        sb.AppendFormat("""userid"" : ""{0}"", ", obj.Userid)
        sb.AppendFormat("""timetonext"" : ""{0}"", ", obj.TimeToNext)
        sb.AppendFormat("""mainscore"" : ""{0}"", ", obj.Monvalue)
        sb.Append("""bokmonsterlist"" : ")
        If obj.BokemonList.Count <= 0 Then
            sb.Append("{}},") '{3-1}
        Else
            For Each itm In obj.BokemonList
                If i = 0 Then
                    sb.Append("[{") '{3-1}
                Else
                    sb.Append(", {")
                End If
                sb.AppendFormat("""monid"" : ""{0}"", ", itm.MonId)
                sb.AppendFormat("""namn"" : ""{0}"", ", itm.Monsternamn)
                sb.AppendFormat("""src"" : ""{0}"", ", itm.BokemonSrc)
                sb.AppendFormat("""lev"" : ""{0}"", ", itm.BokemonLevel)
                sb.AppendFormat("""score"" : ""{0}"", ", itm.BokemonScore)
                sb.AppendFormat("""info"" : ""{0}"" ", itm.Bokemoninfo)

                sb.Append("}") '{3-2}
                i += 1
            Next
            sb.Append("]},") '{2-2}
        End If

        sb.AppendFormat("""status"" : ""{0}"" ", obj.Status)
        sb.Append("}") '{1-2}

        Return sb.ToString

    End Function
End Class
