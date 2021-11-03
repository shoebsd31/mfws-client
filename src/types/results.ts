class Results<T>
{
    /// <summary>
    /// Default constructor, empty.
    /// </summary>
    public Results()
    {
    }

    /// <summary>
    /// Contains results of a query
    /// </summary>
    Items!:Array<T>
    
    /// <summary>
    /// True if there were more results which were left out.
    /// </summary>
     MoreResults! :boolean
    
}