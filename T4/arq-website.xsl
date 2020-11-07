<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:template match="/">
        <xsl:result-document href="arqs/index.html">
            <html>
                <head>
                    <title>Arqueossítios</title>
                </head>
                <body>
                    <h2>Arqueossítios de Portugal</h2>
                    <h3>Índice</h3>
                    <ol>
                        <xsl:apply-templates select="//ARQELEM" mode="indice">
                            <xsl:sort select="IDENTI"/>
                        </xsl:apply-templates>
                    </ol>
                </body>
            </html>
        </xsl:result-document>
        <xsl:apply-templates select="//ARQELEM" mode="conteudo"/>      <!--proximos ficheiros-->
    </xsl:template>
    
    <!-- Templates de índice-->
    
    <xsl:template match="ARQELEM" mode="indice">
        <li>
            <xsl:variable name="id" select="./count(preceding-sibling::*)"/>
            <a name="indice{$id}"/>
            <a href="http://localhost:7777/arqs/{$id}">
            <!--<a href="arq{$id}.html">-->
                <xsl:value-of select="IDENTI"/>
            </a>
        </li>
    </xsl:template>
    
    <!-- Templates de conteúdo -->
    
    <xsl:template match="ARQELEM" mode="conteudo">
        <xsl:variable name="id" select="./count(preceding-sibling::*)"/>
        <xsl:result-document href="arqs/arq{$id}.html">
            <html>
                <head>
                    <title>
                        <xsl:value-of select="IDENTI"/>
                    </title>
                </head>
                <body>
                    
                    <p><b>Descrição: </b><xsl:apply-templates select="DESCRI" mode="texto"/></p>
                    
                    <xsl:if test="CRONO">
                        <p><b>Cronologia: </b><xsl:apply-templates select="CRONO" mode="texto"/></p>
                    </xsl:if>
                    
                    <p><b>Lugar: </b><xsl:apply-templates select="LUGAR" mode="texto"/></p>
                    
                    <p><b>Freguesia: </b><xsl:apply-templates select="FREGUE" mode="texto"/></p>
                    
                    <p><b>Concelho: </b><xsl:apply-templates select="CONCEL" mode="texto"/></p>
                    
                    <xsl:if test="CODADM">
                        <p><b>Código administrativo: </b><xsl:value-of select="CODADM"/></p>
                    </xsl:if>
                    
                    <xsl:if test="LATITU">
                        <p><b>Latitude: </b><xsl:value-of select="LATITU"/></p>    
                    </xsl:if>
                    
                    <xsl:if test="LONGIT">
                        <p><b>Longitude: </b><xsl:value-of select="LONGIT"/></p>    
                    </xsl:if>
                    
                    <xsl:if test="ALTITU">
                        <p><b>Altitude: </b><xsl:value-of select="ALTITU"/></p>
                    </xsl:if>
                    
                    <xsl:if test="ACESSO"> 
                        <p><b>Acesso: </b><xsl:apply-templates select="ACESSO" mode="texto"/></p>
                    </xsl:if>
                    
                    <xsl:if test="QUADRO">
                        <p><b>Quadro: </b><xsl:apply-templates select="QUADRO" mode="texto"/></p>
                    </xsl:if>
                    
                    <xsl:if test="TRAARQ">
                        <p><b>Trabalhos arqueológicos: </b><xsl:apply-templates select="TRAARQ" mode="texto"/></p>
                    </xsl:if>
                    
                    <p><b>Descrição arqueológica: </b><xsl:apply-templates select="DESARQ" mode="texto"/></p>
                    
                    <xsl:if test="INTERP">
                        <p><b>Interpretação: </b><xsl:apply-templates select="INTERP" mode="texto"/></p>
                    </xsl:if>
                    
                    <xsl:if test="INTERE">
                        <p><b>Interesse: </b><xsl:apply-templates select="INTERE" mode="texto"/></p>
                    </xsl:if>
                    
                    <xsl:if test="DEPOSI">
                        <p><b>Depósito: </b><xsl:apply-templates select="DEPOSI" mode="texto"/></p>
                    </xsl:if>
                    
                    <xsl:if test="BIBLIO">
                        <p><b>Bibliografia: </b><xsl:apply-templates select="BIBLIO" mode="texto"/></p>
                    </xsl:if>
                    
                    <p><b>Autor: </b><xsl:value-of select="AUTOR"/></p>
                    
                    <p><b>Data: </b><xsl:value-of select="DATA"/></p>
                    
                    <address>
                        <!--[<a href="index.html#indice{$id}">Voltar à Home</a>]-->
                        [<a href="http://localhost:7777">Voltar à Home</a>]
                    </address>
                    
                </body>
            </html>
        </xsl:result-document>    
    </xsl:template>
    
    <xsl:template match="LIGA" mode="texto">
        <u><xsl:value-of select="."/></u>
    </xsl:template>
    
</xsl:stylesheet>