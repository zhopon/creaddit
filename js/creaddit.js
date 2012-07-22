function comment(redditComment) {

    if (typeof(redditComment) !== 'object') {
        return [];
    }

    if (redditComment.kind === 'Listing') {
        return $.map(redditComment.data.children, comment);
    }

    if (redditComment.kind === 't1') {
        return {
            body : function() {
                var body = '';
                if (typeof(redditComment) === 'object') {
                    body = redditComment.data.body || '';
                }
                return body;
            }(),
            replies : function() {
                return comment(redditComment.data.replies);
            }()
        }
    }
}

var RedditViewModel = function () {
    var that = this;

    this.data = sample_data;
    this.threadData = sample_data[0].data.children[0].data;
    this.threadTitle = this.threadData;

    this.threadComments = comment(this.data[1]);
};

ko.applyBindings(new RedditViewModel());