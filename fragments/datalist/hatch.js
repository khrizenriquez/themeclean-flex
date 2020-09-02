module.exports = {
    convert: function($, f) {
        f.wrap($, 'themecleanflex-components-block')
        f.bindAttribute($.parent(),'model','model')

        const selectedContainer = $.find('div.selected').eq(0)
        const selectedContainerClasses = `{
            'hidden': active.filter(element => element === true).length === 0,
        }`
        f.bindAttribute(selectedContainer, 'class', selectedContainerClasses, false)
        const selectedText = selectedContainer.find('.selected-text').eq(0)
        f.mapField(selectedText, '`${active.filter(element =&gt; element === true).length} selected`', false)
        const actionDelete = selectedContainer.find('svg').eq(0)
        f.bindEvent(actionDelete, 'click', 'deleteAction');

        const desktopContainer = $.find('div.overflow-x-hidden').eq(0);
        const desktopContainerClasses = `{
            'overflow-y-scroll': model.scrollabletable === 'true',
            'hidden': isMobile,
        }`
        f.bindAttribute(desktopContainer, 'class', desktopContainerClasses, false)
        f.addStyle(desktopContainer, 'height', "(model.scrollabletable === 'true') ? model.tableheight + 'px' : 'auto'", false)
        
        const mobileContainer = $.find('div.mobile-table').eq(0);
        const mobileContainerClasses = `{
            'hidden': !isMobile,
        }`
        f.bindAttribute(mobileContainer, 'class', mobileContainerClasses, false)

        const mobileTr = mobileContainer.find('tr').first()
        f.addFor(mobileTr, 'model.columns', 'col')

        const mobileTd = mobileContainer.find('td').first()
        f.addFor(mobileTd, 'storageData', 'data')
        f.mapField(mobileTd, 'data[col.value]', false)

        mobileTr.prepend("<td class='mobile-header'>{{col.header}}</td>")
        f.bindAttribute($.find('.mobile-table td'), 'class', `{ 'border': model.cellborders === 'true', 'p-3': model.densetable !== 'true', 'p-1': model.densetable === 'true'}`, false)

        const table = $.find('table')
        const tableClasses = `{
            'striped': model.stripedrows === 'true'
        }`
        f.bindAttribute(table, 'class', tableClasses, false)

        const thText = $.find('th.header-text').first()
        f.addFor(thText, 'model.columns', 'col')
        const thTextClasses = `{
            'p-3': model.densetable !== 'true',
            'p-1': model.densetable === 'true',
            'sticky': model.stickyheader === 'true',
            'top-0': model.stickyheader === 'true'
        }`
        f.bindAttribute(thText, 'class', thTextClasses, false)
        f.mapField(thText.find('span'), 'col.header', false)

        const thAction = $.find('th.action-head').first()
        f.addIf(thAction, "model.selectable === 'true'")
        f.addIf(thAction.find('.unchecked'), '(!active.every(element => element === true) || active.length === 0)');
        f.addElse(thAction.find('.checked'));
        f.bindEvent(thAction.find('.action').eq(0), 'click', 'toggleAllRows');
        f.bindAttribute(thAction, 'class', thTextClasses, false)

        const tbody = $.find('tbody').first()
        const tr = tbody.find('tr').first()
        const tdItem = tr.find('td.item').first()
        tr.attr('v-for', `(data, j) in storageData`)
        tr.attr(':key', `data.path || j`)
        f.addIf(tr, 'rowHasData(data,model.columns)')

        f.addFor(tdItem, 'model.columns', 'col')
        f.mapField(tdItem.find('span.item-text'), 'data[col.value]', false)

        const tdClasses = `{
            'border': model.cellborders === 'true',
            'p-3': model.densetable !== 'true',
            'p-1': model.densetable === 'true'
        }`    
        f.bindAttribute(tdItem, 'class', tdClasses, false)
        f.addStyle(tdItem, 'background', "active[j] ? 'var(--color-red-500) !important' : ''")

        f.addStyle(tdItem.find('span.item-text'), 'color',"active[j] ? 'var(--text-secondary-color) !important' : ''");

        const tdAction = $.find('td.action-item').first()
        f.addStyle(tdAction, 'background', "active[j] ? 'var(--color-red-500) !important' : ''")
        f.addIf(tdAction, "model.selectable === 'true'")
        f.addIf(tdAction.find('.unchecked'), '!active[j]');
        f.addIf(tdAction.find('.checked'), 'active[j]');
        f.addStyle(tdAction.find('.checked'), 'fill',"active[j] ? 'var(--text-secondary-color) !important' : ''");
        f.bindEvent(tdAction.find('.action').eq(0), 'click', 'toggleRow(j)');
        f.bindAttribute(tdAction, 'class', tdClasses, false)

        const caption = $.find('caption')
        const captionClasses = `{
            'text-left': model.captionalignment === 'left',
            'text-center': model.captionalignment === 'center',
            'text-right': model.captionalignment === 'right',
            'p-3': model.densetable !== 'true',
            'p-1': model.densetable === 'true',
            'hidden': model.caption !== 'true'
        }`
        f.bindAttribute(caption, 'class', captionClasses, false)
        f.addStyle(caption, 'caption-side', "model.captionplacement", false);
        f.mapField(caption, 'model.captiontext')

        f.addElse($);
        $.parent().prepend('<div class="p-5" v-if="isEditAndEmpty">no content defined for component</div>')
    }
}