jQuery(function ($) {

    $.fn.myWysiwyg = function (options = {
        option1: 'bold',
        option2: 'italic',
        option3: 'strike through',
        option4: 'fore color',
        option5: 'font size'
    }) {
        let $textarea = $('#textarea')
        let $title = $('<h1>WYSIWYG</h1>')
        let $inputBold, $inputItalic, $inputStrikethrough, $selectForeColor
        let $optionsForeColor, $selectFontSize, $optionsFontSize
        let $inputCreateLink, $inputUnlink, $inputOutdent, $inputIndent
        let $inputJustifyLeft, $inputJustifyRight, $inputJustifyCenter
        let $inputJustifyFull, $inputSourceCode, $inputNormalDisplay
        let $inputSave, $inputImage
        let $divEditor = $('<div id="editor" contentEditable></div>')
        let code = "normal display"

        for (let option in options) {
            if (jQuery.type(options[option]) === 'array') {
                for (let i = 0; i < options[option].length; i++) {
                    if (options[option][i] === 'bold') {
                        inputBold()
                    }

                    if (options[option][i] === 'italic') {
                        inputItalic()
                    }

                    if (options[option][i] === 'strike through') {
                        inputStrikeThrough()
                    }

                    if (options[option][i] === 'fore color') {
                        selectForeColor()
                    }

                    if (options[option][i] === 'font size') {
                        selectFontSize()
                    }

                    if (options[option][i] === 'link') {
                        inputLink()
                    }

                    if (options[option][i] === 'outdent') {
                        inputOutdent()
                    }

                    if (options[option][i] === 'indent') {
                        inputIndent()
                    }

                    if (options[option][i] === 'justify left') {
                        inputJustifyLeft()
                    }

                    if (options[option][i] === 'justify right') {
                        inputJustifyRight()
                    }

                    if (options[option][i] === 'justify center') {
                        inputJustifyCenter()
                    }

                    if (options[option][i] === 'justify full') {
                        inputJustifyFull()
                    }

                    if (options[option][i] === 'source code') {
                        inputSourceCode()
                    }

                    if (options[option][i] === 'save') {
                        inputSave()
                    }

                    if (options[option][i] === 'image') {
                        inputImage()
                    }
                }
            } else {
                if (options[option] === 'bold') {
                    inputBold()
                }

                if (options[option] === 'italic') {
                    inputItalic()
                }

                if (options[option] === 'strike through') {
                    inputStrikeThrough()
                }

                if (options[option] === 'fore color') {
                    selectForeColor()
                }

                if (options[option] === 'font size') {
                    selectFontSize()
                }

                if (options[option] === 'link') {
                    inputLink()
                }

                if (options[option] === 'outdent') {
                    inputOutdent()
                }

                if (options[option] === 'indent') {
                    inputIndent()
                }

                if (options[option] === 'justify left') {
                    inputJustifyLeft()
                }

                if (options[option] === 'justify right') {
                    inputJustifyRight()
                }

                if (options[option] === 'justify center') {
                    inputJustifyCenter()
                }

                if (options[option] === 'justify full') {
                    inputJustifyFull()
                }

                if (options[option] === 'source code') {
                    inputSourceCode()
                }

                if (options[option] === 'save') {
                    inputSave()
                }

                if (options[option] === 'image') {
                    inputImage()
                }
            }
        }

        $textarea.before($title)
        $textarea.append($divEditor)
        $divEditor = $('#editor')
        document.execCommand("defaultParagraphSeparator", false, "p")

        if ($inputSourceCode !== undefined) {
            if (localStorage.getItem('code') === 'source code') {
                $inputSourceCode.attr('disabled', 'disabled')
            } else {
                $inputNormalDisplay.attr('disabled', 'disabled')
            }
        }

        if (localStorage.getItem('textarea')) {
            $divEditor[0].innerHTML = localStorage.getItem('textarea')
            setInterval(function () {
                localStorage.setItem('textarea', $divEditor[0].innerHTML)
            }, 300000)
            if ($divEditor[0] !== localStorage.getItem('textarea')) {
                window.onbeforeunload = function (event) {
                    event.preventDefault()
                }
            }
        }

        $title.css('text-align', 'center')

        $textarea.css({
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px 10px',
            border: '4px ridge black',
            'border-radius': '15px',
            background: 'grey',
            'text-align': 'center'
        })


        $divEditor.css({
            width: '500px',
            height: '200px',
            margin: '20px auto',
            padding: '5px',
            border: '2px solid black',
            background: 'white',
            'text-align': 'left',
            overflow: 'auto',
            'word-wrap': 'break-word'
        })

        function command(name, arg) {
            if (typeof arg === 'undefined') {
                arg = ''
            }
            switch (name) {
                case 'createLink':
                    arg = prompt("Quelle est l'adresse du lien ?")
                    break
                case 'insertImage':
                    arg = prompt("Quelle est l'adresse ou le chemin de l'image"
                        + " ?")
                    break
            }
            document.execCommand(name, false, arg)
        }

        function inputBold() {
            $inputBold = $('<input type="button" value="G" />')
            $textarea.append($inputBold)
            $inputBold.css('font-weight', 'bold')
            $inputBold.click(function () {
                command('bold')
            })
        }

        function inputItalic() {
            $inputItalic = $('<input type="button" value="I" />')
            $textarea.append($inputItalic)
            $inputItalic.css('font-style', 'italic')
            $inputItalic.click(function () {
                command('italic')
            })
        }

        function inputStrikeThrough() {
            $inputStrikethrough = $('<input type="button" value="B" />')
            $textarea.append($inputStrikethrough)
            $inputStrikethrough.css('text-decoration', 'line-through')
            $inputStrikethrough.click(function () {
                command('strikeThrough')
            })
        }

        function selectForeColor() {
            $selectForeColor = $('<select></select>')
            $optionsForeColor = $('<option disabled>- Couleur -</option>'
                + '<option value="black" selected>Noir (défaut)</option>'
                + '<option value="blue">Bleu</option>'
                + '<option value="green">Vert</option>'
                + '<option value="red">Rouge</option>'
                + '<option value="orange">Orange</option>'
                + '<option value="yellow">Jaune</option>'
                + '<option value="pink">Rose</option>'
                + '<option value="purple">Mauve</option>')
            $textarea.append($selectForeColor)
            $selectForeColor.append($optionsForeColor)
            $selectForeColor.change(function () {
                command('foreColor', this.value)
            })
        }

        function selectFontSize() {
            $selectFontSize = $('<select></select>')
            $optionsFontSize = $('<option disabled>- Taille police -</option>'
                + '<option value="1">1</option>'
                + '<option value="2">2</option>'
                + '<option value="3" selected>3 (défaut)</option>'
                + '<option value="4">4</option>'
                + '<option value="5">5</option>'
                + '<option value="6">6</option>')
            $textarea.append($selectFontSize)
            $selectFontSize.append($optionsFontSize)
            $selectFontSize.change(function () {
                command('fontSize', this.value)
            })
        }

        function inputLink() {
            $inputCreateLink = $('<input type="button" value="Lien" />')
            $inputUnlink = $('<input type="button" value="Lien" />')
            $textarea.append($inputCreateLink)
            $textarea.append($inputUnlink)
            $inputUnlink.css('text-decoration', 'line-through')
            $inputCreateLink.click(function () {
                command('createLink')
            })
            $inputUnlink.click(function () {
                command('unlink')
            })
        }

        function inputOutdent() {
            $inputOutdent = $('<input type="button" value="<-" />')
            $textarea.append($inputOutdent)
            $inputOutdent.click(function () {
                command('outdent')
            })
        }

        function inputIndent() {
            $inputIndent = $('<input type="button" value="->" />')
            $textarea.append($inputIndent)
            $inputIndent.click(function () {
                command('indent')
            })
        }

        function inputJustifyLeft() {
            $inputJustifyLeft = $('<input type="button" '
                + 'value="Aligner à gauche" />')
            $textarea.append($inputJustifyLeft)
            $inputJustifyLeft.click(function () {
                command('justifyLeft')
            })
        }

        function inputJustifyRight() {
            $inputJustifyRight = $('<input type="button" '
                + 'value="Aligner à droite" />')
            $textarea.append($inputJustifyRight)
            $inputJustifyRight.click(function () {
                command('justifyRight')
            })
        }

        function inputJustifyCenter() {
            $inputJustifyCenter = $('<input type="button" '
                + 'value="Aligner au centre" />')
            $textarea.append($inputJustifyCenter)
            $inputJustifyCenter.click(function () {
                command('justifyCenter')
            })
        }

        function inputJustifyFull() {
            $inputJustifyFull = $('<input type="button" value="Justifier" />')
            $textarea.append($inputJustifyFull)
            $inputJustifyFull.click(function () {
                command('justifyFull')
            })
        }

        function inputSourceCode() {
            $inputSourceCode = $('<input type="button" value="Code source" />')
            $inputNormalDisplay = $('<input type="button" '
                + 'value="Affichage normal" />')
            $textarea.append($inputSourceCode)
            $textarea.append($inputNormalDisplay)
            $inputSourceCode.click(function () {
                $inputSourceCode.attr('disabled', 'disabled')
                $inputNormalDisplay.removeAttr('disabled', 'disabled')
                $divEditor[0].innerText = $divEditor[0].innerHTML
                code = "source code"
            })
            $inputNormalDisplay.click(function () {
                $inputSourceCode.removeAttr('disabled', 'disabled')
                $inputNormalDisplay.attr('disabled', 'disabled')
                $divEditor[0].innerHTML = $divEditor[0].innerText
                code = "normal display"
            })
        }

        function save_to_LocalStorage() {
            localStorage.setItem('textarea', $divEditor[0].innerHTML)
            localStorage.setItem('code', code)
        }

        function confirmMessage() {
            if (confirm("Voulez-vous sauvegarder ?\n(Si oui : sauvegarde "
                    + "automatique toutes les 5 minutes)")) {
                save_to_LocalStorage()
            }
        }

        function inputSave() {
            $inputSave = $('<input type="button" value="Sauvegarder" />')
            $textarea.append($inputSave)
            $inputSave.click(function () {
                confirmMessage()
            })
        }

        function inputImage() {
            $inputImage = $('<input type="button" value="Image" />')
            $textarea.append($inputImage)
            $inputImage.click(function () {
                command('insertImage')
            })
        }
    }
})