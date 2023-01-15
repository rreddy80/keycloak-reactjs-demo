import { Switch } from "react-router-dom";
import BookDetails from "./BookDetails";
import BookForm from "./BookForm";
import BookList from "./BookList";
import RolesRoute from "./RolesRoute";

const BookBox = () => (
  <>
    <Switch>
        <RolesRoute exact path="/" roles={['mappsuser']}>
          <BookList/>
        </RolesRoute>
        <RolesRoute exact path="/books/new" roles={['mappsuser']}>
          <BookForm/>
        </RolesRoute>
        <RolesRoute path="/books/:bookId" roles={['mappsuser']}>
          <BookDetails/>
        </RolesRoute>
    </Switch>
  </>
)

export default BookBox
