import { dialog } from 'electron';
import { BrowserWindowBase } from './browserWindowBase'

export class MainWindow extends BrowserWindowBase {

    constructor(url: string) {
        super(url);
    }

    public onOpenFileMenuItem() {
        dialog.showOpenDialog({
            properties: ['openFile'],
            filters: [
                {name: 'Imanges', extensions: ['jpg', 'png', 'gif']},
                {name: 'All Files', extensions: ['*']}]
        }, function(filePaths) {
            if (filePaths != null) {
            filePaths.forEach(function(value) {
                console.log(value);
            });
            }
        });
    }
}
